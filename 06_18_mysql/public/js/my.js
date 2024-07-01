testBtn.addEventListener('click', async function(){ // await을 사용하기 위해 async
    // 직접 사용 코드
    // var xhttp = new XMLHttpRequest();
    // xhttp.onreadystatechange = function() {
    //     if (this.readyState == 4 && this.status == 200) {
    //     // Typical action to be performed when the document is ready:
    //     //document.getElementById("demo").innerHTML = xhttp.responseText;
    //     console.log(xhttp.responseText);
    //     }
    // };
    // xhttp.open("GET", "/list", true);
    // xhttp.send();

    // 간접 사용
    let resObj = await fetch('/list');
    let data = await resObj.json();
    //console.log(data);
    let displayData = 
    `<thead>
        <td>ID</td>
        <td>Title</td>
        <td>writer</td>
        <td>created</td>
    </tead>
    <tbody>`;
    data.forEach((item, index) => { // item이 있을 때 까지 반복 (동기함수)
        displayData +=
        `<tr>
            <td>${item.id}</td>
            <td>${item.title}</td>
            <td>${item.profile_id}</td>
            <td>${item.created}</td>
        </tr>`
    });

    displayData += `</tbody>`;

    document.getElementById("datatablesSimple").innerHTML = displayData;    // displayData를 datatablesSimple에 HTML로 넣어줌 (innerText는 Text로 넣어줌)
});