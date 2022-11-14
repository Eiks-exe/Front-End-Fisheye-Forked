/**
 * 
 * @param {*} values value options
 */
const selectBox = (selectElement, values) =>{
    const newSelect = document.getElementById("select")
    values.forEach(value => {
        const selected = document.createElement("div")
        selected.setAttribute('class', 'select-selected')
        selected.innerHTML = value
        
        console.log(selectElement)
        
        newSelect.appendChild(selected)
        const b = document.createElement("DIV");
        b.setAttribute("class", "select-items select-hide");
    });
    
}

export default selectBox