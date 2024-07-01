testBtn.addEventListener('click', async function () {
    try{
        let resObject = await fetch('/list')
        let data = await resObject.json();

        // datatablesSimple
        let displayData = `
        <thead>
            <th>ID</th>
            <th>Title</th>
            <th>Writer</th>
            <th>Created</th>
        </thead>
        <tbody>`;
        data.forEach((item, index) => {
            displayData += `
            <tr>
                <td>${item.id}</td>
                <td data-bs-toggle="modal" data-bs-target="#myModal${item.id}">${item.title}</td>
                <td>${item.writer}</td>
                <td>${item.created}</td>
            </tr>
            `;
        });
        displayData += `</tbody>`;

        // modals
        let displayData_modals = ''
        data.forEach((item, index) => {
            displayData_modals += `
            <div class="modal" id="myModal${item.id}"><div class="modal-dialog"><div class="modal-content">

                <div class="modal-header">
                    <h4 class="modal-title">${item.title}</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>

                <div class="modal-body">
                    ${item.content}
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                </div>
            </div></div></div>
            `;
        });

        document.getElementById("datatablesSimple").innerHTML = displayData;
        document.getElementById("modals").innerHTML = displayData_modals;
    }catch(err){
        alert('게시물 조회 실패');
    }
});