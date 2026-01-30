program credentify.aleo {
    
    // Private credential record - stored in user's wallet
    record Credential {
        owner: address,
        event_id: field,
        issued_at: u32,
        issuer: address
    }

    // Event information stored publicly
    struct EventInfo {
        organizer: address,
        active: bool,
        total_issued: u32
    }

    // Public registry of events
    mapping events: field => EventInfo;
    
    // Track organizer permissions
    mapping organizers: address => bool;
    
    // Track if contract is initialized (required for deployment)
    mapping initialized: u8 => bool;

    // Initialize the contract with first organizer
    async transition initialize(admin: address) -> Future {
        return finalize_initialize(admin);
    }

    async function finalize_initialize(admin: address) {
        let is_initialized: bool = Mapping::get_or_use(organizers, admin, false);
        assert(!is_initialized);
        Mapping::set(organizers, admin, true);
    }

    // Register a new event (organizer only)
    async transition register_event(event_id: field) -> Future {
        return finalize_register_event(event_id, self.caller);
    }

    async function finalize_register_event(event_id: field, caller: address) {
        // Verify caller is authorized organizer
        let is_organizer: bool = Mapping::get(organizers, caller);
        assert(is_organizer);

        // Create new event
        let event_info: EventInfo = EventInfo {
            organizer: caller,
            active: true,
            total_issued: 0u32
        };

        Mapping::set(events, event_id, event_info);
    }

    // Issue a credential to an attendee
    async transition issue_credential(
        receiver: address,
        event_id: field,
        timestamp: u32
    ) -> (Credential, Future) {
        // Create private credential record
        let credential: Credential = Credential {
            owner: receiver,
            event_id: event_id,
            issued_at: timestamp,
            issuer: self.caller
        };

        return (credential, finalize_issue(event_id, self.caller));
    }

    async function finalize_issue(event_id: field, caller: address) {
        // Verify event exists and is active
        let event_info: EventInfo = Mapping::get(events, event_id);
        assert(event_info.active);
        assert_eq(event_info.organizer, caller);

        // Increment issued count
        let updated_info: EventInfo = EventInfo {
            organizer: event_info.organizer,
            active: event_info.active,
            total_issued: event_info.total_issued + 1u32
        };

        Mapping::set(events, event_id, updated_info);
    }

    // Verify credential ownership (generates ZK proof)
    transition verify_credential(credential: Credential) -> bool {
        // This transition proves the user owns a valid credential
        // without revealing which event or when it was issued
        assert_eq(credential.owner, self.caller);
        return true;
    }

    // Verify credential for specific event
    transition verify_event_credential(
        credential: Credential,
        event_id: field
    ) -> bool {
        assert_eq(credential.owner, self.caller);
        assert_eq(credential.event_id, event_id);
        return true;
    }

    // Add a new organizer (admin only)
    async transition add_organizer(new_organizer: address) -> Future {
        return finalize_add_organizer(new_organizer, self.caller);
    }

    async function finalize_add_organizer(new_organizer: address, caller: address) {
        // Verify caller is existing organizer
        let is_organizer: bool = Mapping::get(organizers, caller);
        assert(is_organizer);

        // Add new organizer
        Mapping::set(organizers, new_organizer, true);
    }

    // Deactivate an event (organizer only)
    async transition deactivate_event(event_id: field) -> Future {
        return finalize_deactivate(event_id, self.caller);
    }

    async function finalize_deactivate(event_id: field, caller: address) {
        let event_info: EventInfo = Mapping::get(events, event_id);
        assert_eq(event_info.organizer, caller);

        let updated_info: EventInfo = EventInfo {
            organizer: event_info.organizer,
            active: false,
            total_issued: event_info.total_issued
        };

        Mapping::set(events, event_id, updated_info);
    }

    // Batch issue credentials (Wave 2 preview)
    async transition batch_issue(
        receivers: [address; 5],
        event_id: field,
        timestamp: u32
    ) -> (Credential, Credential, Credential, Credential, Credential, Future) {
        let c1: Credential = Credential {
            owner: receivers[0u8],
            event_id: event_id,
            issued_at: timestamp,
            issuer: self.caller
        };

        let c2: Credential = Credential {
            owner: receivers[1u8],
            event_id: event_id,
            issued_at: timestamp,
            issuer: self.caller
        };

        let c3: Credential = Credential {
            owner: receivers[2u8],
            event_id: event_id,
            issued_at: timestamp,
            issuer: self.caller
        };

        let c4: Credential = Credential {
            owner: receivers[3u8],
            event_id: event_id,
            issued_at: timestamp,
            issuer: self.caller
        };

        let c5: Credential = Credential {
            owner: receivers[4u8],
            event_id: event_id,
            issued_at: timestamp,
            issuer: self.caller
        };

        return (c1, c2, c3, c4, c5, finalize_batch_issue(event_id, self.caller));
    }

    async function finalize_batch_issue(event_id: field, caller: address) {
        let event_info: EventInfo = Mapping::get(events, event_id);
        assert(event_info.active);
        assert_eq(event_info.organizer, caller);

        let updated_info: EventInfo = EventInfo {
            organizer: event_info.organizer,
            active: event_info.active,
            total_issued: event_info.total_issued + 5u32
        };

        Mapping::set(events, event_id, updated_info);
    }
}
