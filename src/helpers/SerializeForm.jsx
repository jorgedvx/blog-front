export const SerializeForm = (form) => {

    const formData = new FormData(form)

    const completeOBj = {};
   
    
    for(let [name, value] of formData){
        completeOBj[name] = value;
        
    }

    return completeOBj;

}
