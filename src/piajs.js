export function saveAndReturnPiaStatus(context, piaExpire){
    const id = context.id;
    const record = Pia.get(id);

    // not show popup when the record still exists
    if(record) return true;

    // save the new record
    Pia.set(id, true, {expires: isNaN(piaExpire) ? piaExpire : parseInt(piaExpire)});
    return false;
}