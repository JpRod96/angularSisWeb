function increaseRowCounter(){
    let rowCounter = document.getElementById("productsTotal");
    rowCounter.textContent = rows();
}

function rows(){
    let table = document.getElementById("product-table"); 
    let table_size = table.rows.length;
    let r = table_size - 2;
    return r;
}

function addClickable(){
    let rows = document.getElementsByTagName("tr");
    let i;
    for(i = 0; i<rows ;i++)
    {
        rows[i].addEventListener('click', test);
    }
}