/**
 * Get JSON options
 * @version 0.0.1
 * @returns void
 */
export function getOptions(context){
    const numeric = ['autoShow']; // convert these props to float
    const wrapper = context.el;

    // options from attribute
    let dataAttribute = wrapper.getAttribute(context.attributes.init);
    let options = {};

    // data attribute doesn't exist or not JSON format -> get default ID
    if(!dataAttribute || !isJSON(dataAttribute)){
        context.id = dataAttribute || context.options.id;
        return;
    }

    // option priority: attribute > js object > default
    options = JSON.parse(dataAttribute);

    for(const [key, value] of Object.entries(options)){
        // convert boolean string to real boolean
        if(value === "false") options[key] = false;
        else if(value === "true") options[key] = true;
        else options[key] = value;

        // convert string to float
        if(numeric.includes(key) && typeof value === 'string' && value.length > 0){
            options[key] = parseFloat(value);
        }
    }

    context.options = {...context.options, ...options};
    context.id = options.id || context.options.id;

    // remove json
    wrapper.removeAttribute(context.attributes.init);
}


/**
 * Is JSON string
 * https://stackoverflow.com/a/32278428/6453822
 * @param string
 * @returns {any|boolean}
 */
export function isJSON(string){
    try{
        return (JSON.parse(string) && !!string);
    }catch(e){
        return false;
    }
}