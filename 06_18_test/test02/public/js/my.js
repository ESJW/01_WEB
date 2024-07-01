btn.addEventListener('click', async function(){
    let resObj = await fetch('/list');
    let data = await resObj.json();

    let displayData = 
    `<thead>
        <td>ID</td>
        <td>Title</td>
        <td>Writer</td>
        <td>created</td>
    </thead>
    <tbody>`;
    data.forEach((item, index) => {
        displayData +=
        `<tr>
            <td>${item.id}</td>
            <td>${item.title}</td>
            <td>${item.profile_id}</td>
            <td>${item.created}</td>
        </tr>`
    });
    displayData += '</tbody>';
    document.getElementById('datatablesSimple').innerHTML = displayData;
});