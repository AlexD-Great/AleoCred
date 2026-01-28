program credentify.aleo;

record Credential:
    owner as address.private;
    event_id as field.private;
    issued_at as u32.private;
    issuer as address.private;

struct EventInfo:
    organizer as address;
    active as boolean;
    total_issued as u32;

mapping events:
    key as field.public;
    value as EventInfo.public;

mapping organizers:
    key as address.public;
    value as boolean.public;

mapping initialized:
    key as u8.public;
    value as boolean.public;

function initialize:
    input r0 as address.private;
    async initialize r0 into r1;
    output r1 as credentify.aleo/initialize.future;

finalize initialize:
    input r0 as address.public;
    get.or_use organizers[r0] false into r1;
    not r1 into r2;
    assert.eq r2 true;
    set true into organizers[r0];

function register_event:
    input r0 as field.private;
    async register_event r0 self.caller into r1;
    output r1 as credentify.aleo/register_event.future;

finalize register_event:
    input r0 as field.public;
    input r1 as address.public;
    get organizers[r1] into r2;
    assert.eq r2 true;
    cast r1 true 0u32 into r3 as EventInfo;
    set r3 into events[r0];

function issue_credential:
    input r0 as address.private;
    input r1 as field.private;
    input r2 as u32.private;
    cast r0 r1 r2 self.caller into r3 as Credential.record;
    async issue_credential r1 self.caller into r4;
    output r3 as Credential.record;
    output r4 as credentify.aleo/issue_credential.future;

finalize issue_credential:
    input r0 as field.public;
    input r1 as address.public;
    get events[r0] into r2;
    assert.eq r2.active true;
    assert.eq r2.organizer r1;
    add r2.total_issued 1u32 into r3;
    cast r2.organizer r2.active r3 into r4 as EventInfo;
    set r4 into events[r0];

function verify_credential:
    input r0 as Credential.record;
    assert.eq r0.owner self.caller;
    output true as boolean.private;

function verify_event_credential:
    input r0 as Credential.record;
    input r1 as field.private;
    assert.eq r0.owner self.caller;
    assert.eq r0.event_id r1;
    output true as boolean.private;

function add_organizer:
    input r0 as address.private;
    async add_organizer r0 self.caller into r1;
    output r1 as credentify.aleo/add_organizer.future;

finalize add_organizer:
    input r0 as address.public;
    input r1 as address.public;
    get organizers[r1] into r2;
    assert.eq r2 true;
    set true into organizers[r0];

function deactivate_event:
    input r0 as field.private;
    async deactivate_event r0 self.caller into r1;
    output r1 as credentify.aleo/deactivate_event.future;

finalize deactivate_event:
    input r0 as field.public;
    input r1 as address.public;
    get events[r0] into r2;
    assert.eq r2.organizer r1;
    cast r2.organizer false r2.total_issued into r3 as EventInfo;
    set r3 into events[r0];

function batch_issue:
    input r0 as [address; 5u32].private;
    input r1 as field.private;
    input r2 as u32.private;
    cast r0[0u32] r1 r2 self.caller into r3 as Credential.record;
    cast r0[1u32] r1 r2 self.caller into r4 as Credential.record;
    cast r0[2u32] r1 r2 self.caller into r5 as Credential.record;
    cast r0[3u32] r1 r2 self.caller into r6 as Credential.record;
    cast r0[4u32] r1 r2 self.caller into r7 as Credential.record;
    async batch_issue r1 self.caller into r8;
    output r3 as Credential.record;
    output r4 as Credential.record;
    output r5 as Credential.record;
    output r6 as Credential.record;
    output r7 as Credential.record;
    output r8 as credentify.aleo/batch_issue.future;

finalize batch_issue:
    input r0 as field.public;
    input r1 as address.public;
    get events[r0] into r2;
    assert.eq r2.active true;
    assert.eq r2.organizer r1;
    add r2.total_issued 5u32 into r3;
    cast r2.organizer r2.active r3 into r4 as EventInfo;
    set r4 into events[r0];

constructor:
    assert.eq edition 0u16;
