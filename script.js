document.addEventListener("DOMContentLoaded", () => {
    tippy('[data-tippy-content]');
});

document.addEventListener("DOMContentLoaded", () => {
    const tabLinks = document.querySelectorAll(".tab-link");
    const tabPanes = document.querySelectorAll(".tab-pane");

    tabLinks.forEach(link => {
        link.addEventListener("click", function () {
            tabLinks.forEach(item => item.classList.remove("active"));
            tabPanes.forEach(pane => pane.classList.remove("active"));

            this.classList.add("active");

            const targetPaneId = this.getAttribute("data-tab");
            document.getElementById(targetPaneId).classList.add("active");
        });
    });
    matrixBox();
});

let coCount = 0;
let poCount = 0;
let psoCount = 0;

function addCO() {
    coCount++;
    let coBoxHTML = `<div class='o-box' id='co-${coCount}'>
                                <div class='o-header'>
                                    <span class='o-title'>CO ${coCount}</span>
                                </div>
                                <textarea id='co-description-${coCount}' class='form-inp' placeholder='Enter CO description...'></textarea>
                            </div>`;
    document.getElementById("co-mapping-list").insertAdjacentHTML("beforeend", coBoxHTML);
    document.getElementById("co-count").textContent = coCount;
    matrixBox();
}

function addPO() {
    poCount++;
    let poBoxHTML = `<div class='o-box' id='po-${poCount}'>
                                <div class='o-header'>
                                    <span class='o-title'>PO ${poCount}</span>
                                </div>
                                <textarea id='po-description-${poCount}' class='form-inp' placeholder='Enter PO description...'></textarea>
                            </div>`;
    document.getElementById("po-mapping-list").insertAdjacentHTML("beforeend", poBoxHTML);
    document.getElementById("po-count").textContent = poCount;
    matrixBox();
}

function addPSO() {
    psoCount++;
    let psoBoxHTML = `<div class='o-box' id='pso-${psoCount}'>
                                <div class='o-header'>
                                    <span class='o-title'>PSO ${psoCount}</span>
                                </div>
                                <textarea id='pso-description-${psoCount}' class='form-inp' placeholder='Enter PSO description...'></textarea>
                            </div>`;
    document.getElementById("pso-mapping-list").insertAdjacentHTML("beforeend", psoBoxHTML);
    document.getElementById("pso-count").textContent = psoCount;
    matrixBox();
}

function deleteLastCO() {
    if (coCount > 0) {
        document.getElementById(`co-${coCount}`).remove();
        coCount--;
    }
    document.getElementById("co-count").textContent = coCount;
    matrixBox();
}

function deleteLastPO() {
    if (poCount > 0) {
        document.getElementById(`po-${poCount}`).remove();
        poCount--;
    }
    document.getElementById("po-count").textContent = poCount;
    matrixBox();
}

function deleteLastPSO() {
    if (psoCount > 0) {
        document.getElementById(`pso-${psoCount}`).remove();
        psoCount--;
    }
    document.getElementById("pso-count").textContent = psoCount;
    matrixBox();
}

function matrixBox() {
    const tableHeadRow1 = document.getElementById("matrixHeadRow1");
    const tableHeadRow2 = document.getElementById("matrixHeadRow2");
    const tableBody = document.getElementById("matrixBody");

    if (!tableHeadRow1 || !tableHeadRow2 || !tableBody) return;

    const savedValues = {};
    document.querySelectorAll(".matrix-select").forEach(select => {
        const co = select.getAttribute("data-co");
        const col = select.getAttribute("data-col");
        if (co && col) {
            savedValues[`${co}-${col}`] = select.value;
        }
    });

    tableHeadRow1.innerHTML = '<th rowspan="2" class="sticky-col col-co-heading">Course Outcomes</th>';
    tableHeadRow2.innerHTML = '';
    tableBody.innerHTML = '';

    if (poCount > 0) {
        const poHeader = document.createElement("th");
        poHeader.setAttribute("colspan", poCount);
        poHeader.className = "group-heading po-group-heading";
        poHeader.innerText = "Program Outcomes (POs)";
        tableHeadRow1.appendChild(poHeader);

        let poHtmlString = "";
        for (let i = 1; i <= poCount; i++) {
            poHtmlString += `<th id="po-th-${i}">PO${i}</th>`;
        }
        tableHeadRow2.innerHTML += poHtmlString;
    }
    
    if (psoCount > 0) {
        const psoHeader = document.createElement("th");
        psoHeader.setAttribute("colspan", psoCount);
        psoHeader.className = "group-heading pso-group-heading";
        psoHeader.innerText = "Program Specific Outcomes (PSOs)";
        tableHeadRow1.appendChild(psoHeader);

        let psoHtmlString = "";
        for (let i = 1; i <= psoCount; i++) {
            psoHtmlString += `<th id="pso-th-${i}">PSO${i}</th>`;
        }
        tableHeadRow2.innerHTML += psoHtmlString;
    }
    
    const totalColumns = poCount + psoCount;

    for (let r = 1; r <= coCount; r++) {
        const row = document.createElement("tr");

        let rowHTML = `
            <td class="sticky-col co-label-cell" id="co-td-${r}">
                <strong>CO ${r}</strong>
            </td>
        `;

        for (let c = 1; c <= totalColumns; c++) {
            const cellKey = `${r}-${c}`;
            const savedVal = savedValues[cellKey] || "";

            let valClass = "";
            if (savedVal === "1") valClass = "val-1";
            else if (savedVal === "2") valClass = "val-2";
            else if (savedVal === "3") valClass = "val-3";

            rowHTML += `
                <td>
                    <select class="matrix-select ${valClass}" data-co="${r}" data-col="${c}" onchange="styleActiveCell(this)">
                        <option value="" ${savedVal === "" ? "selected" : ""}>-</option>
                        <option value="1" ${savedVal === "1" ? "selected" : ""}>1</option>
                        <option value="2" ${savedVal === "2" ? "selected" : ""}>2</option>
                        <option value="3" ${savedVal === "3" ? "selected" : ""}>3</option>
                    </select>
                </td>
            `;
        }

        row.innerHTML = rowHTML;
        tableBody.appendChild(row);
    }

    for (let i = 1; i <= poCount; i++) {
        tippy(`#po-th-${i}`, { 
            onShow(instance) {
                let currentText = document.getElementById(`po-description-${i}`).value;
                instance.setContent(currentText || `PO ${i} not entered.`);
            }
        });
    }

    for (let i = 1; i <= psoCount; i++) {
        tippy(`#pso-th-${i}`, { 
            onShow(instance) {
                let currentText = document.getElementById(`pso-description-${i}`).value;
                instance.setContent(currentText || `PSO ${i} not entered.`);
            }
        });
    }

    for (let r = 1; r <= coCount; r++) {
        tippy(`#co-td-${r}`, { 
            onShow(instance) {
                let currentText = document.getElementById(`co-description-${r}`).value;
                instance.setContent(currentText || `CO ${r} not entered.`);
            }
        });
    }
}

function styleActiveCell(selectElement) {
    selectElement.classList.remove("val-1", "val-2", "val-3");

    if (selectElement.value !== "") {
        if (selectElement.value === "1") {
            selectElement.classList.add("val-1");
        } else if (selectElement.value === "2") {
            selectElement.classList.add("val-2");
        } else if (selectElement.value === "3") {
            selectElement.classList.add("val-3");
        }
    }
}

function importCSV(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const text = e.target.result;
        
        const rows = [];
        let currentRow = [];
        let currentCell = '';
        let inQuotes = false;

        for (let i = 0; i < text.length; i++) {
            let char = text[i];
            let nextChar = text[i + 1];

            if (char === '"') {
                if (inQuotes && nextChar === '"') {
                    currentCell += '"';
                    i++;
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (char === ',' && !inQuotes) {
                currentRow.push(currentCell.trim());
                currentCell = '';
            } else if ((char === '\r' || char === '\n') && !inQuotes) {
                if (char === '\r' && nextChar === '\n') i++;
                currentRow.push(currentCell.trim());
                if (currentRow.some(cell => cell !== "")) {
                    rows.push(currentRow);
                }
                currentRow = [];
                currentCell = '';
            } else {
                currentCell += char;
            }
        }
        if (currentCell || currentRow.length > 0) {
            currentRow.push(currentCell.trim());
            if (currentRow.some(cell => cell !== "")) rows.push(currentRow);
        }

        if (rows.length < 2) {
            alert("The uploaded CSV is empty or invalid.");
            return;
        }

        const headers = rows[0];
        let coColIndex = -1;
        let descColIndex = -1;
        const poColumns = [];
        const psoColumns = [];

        let fallbackPoCounter = 1;
        let fallbackPsoCounter = 1;

        headers.forEach((header, i) => {
            const cleanHeader = header.toLowerCase();

            if (cleanHeader.includes("pso")) {
                const match = cleanHeader.match(/\d+/);
                const num = match ? parseInt(match[0], 10) : fallbackPsoCounter++;
                psoColumns.push({ csvIdx: i, num: num });
            } else if (cleanHeader.includes("po")) {
                const match = cleanHeader.match(/\d+/);
                const num = match ? parseInt(match[0], 10) : fallbackPoCounter++;
                poColumns.push({ csvIdx: i, num: num });
            } else if (cleanHeader.match(/desc|detail|text|content|statement|summary/)) {
                descColIndex = i;
            } else if (cleanHeader.match(/co\b|outcome|course/)) {
                if (coColIndex === -1) coColIndex = i;
            }
        });

        if (coColIndex === -1) {
            for (let i = 0; i < headers.length; i++) {
                if (descColIndex !== i && !poColumns.some(p => p.csvIdx === i) && !psoColumns.some(p => p.csvIdx === i)) {
                    coColIndex = i;
                    break;
                }
            }
            if (coColIndex === -1) coColIndex = 0;
        }

        const maxPoNum = poColumns.length > 0 ? Math.max(...poColumns.map(p => p.num)) : 0;
        const maxPsoNum = psoColumns.length > 0 ? Math.max(...psoColumns.map(p => p.num)) : 0;

        coCount = 0; poCount = 0; psoCount = 0;
        document.getElementById("co-mapping-list").innerHTML = "";
        document.getElementById("po-mapping-list").innerHTML = "";
        document.getElementById("pso-mapping-list").innerHTML = "";

        for (let i = 1; i <= maxPoNum; i++) addPO();
        for (let i = 1; i <= maxPsoNum; i++) addPSO();

        for (let r = 1; r < rows.length; r++) {
            const rowData = rows[r];
            if (!rowData || rowData.length <= Math.max(coColIndex, descColIndex)) continue;

            addCO();

            if (descColIndex !== -1 && rowData[descColIndex] !== undefined) {
                const descInput = document.getElementById(`co-description-${coCount}`);
                if (descInput) descInput.value = rowData[descColIndex];
            }

            poColumns.forEach(poCol => {
                const val = rowData[poCol.csvIdx];
                if (val && ["1", "2", "3"].includes(val.trim())) {
                    const targetUiCol = poCol.num;
                    const select = document.querySelector(`.matrix-select[data-co="${coCount}"][data-col="${targetUiCol}"]`);
                    if (select) {
                        select.value = val.trim();
                        styleActiveCell(select);
                    }
                }
            });

            psoColumns.forEach(psoCol => {
                const val = rowData[psoCol.csvIdx];
                if (val && ["1", "2", "3"].includes(val.trim())) {
                    const targetUiCol = maxPoNum + psoCol.num;
                    const select = document.querySelector(`.matrix-select[data-co="${coCount}"][data-col="${targetUiCol}"]`);
                    if (select) {
                        select.value = val.trim();
                        styleActiveCell(select);
                    }
                }
            });
        }

        event.target.value = "";
    };

    reader.readAsText(file);
}

function exportCSV() {
    if (coCount === 0) {
        alert("There is no matrix data available to export.");
        return;
    }

    const csvRows = [];
    
    let headerRow = '"Outcome","Description"';
    for (let i = 1; i <= poCount; i++) headerRow += `,"PO${i}"`;
    for (let i = 1; i <= psoCount; i++) headerRow += `,"PSO${i}"`;
    csvRows.push(headerRow);

    const totalColumns = poCount + psoCount;

    for (let r = 1; r <= coCount; r++) {
        const coDescInput = document.getElementById(`co-description-${r}`);
        const coDesc = coDescInput ? coDescInput.value.replace(/"/g, '""') : "";
        
        let rowData = `"CO ${r}","${coDesc}"`;

        for (let c = 1; c <= totalColumns; c++) {
            const select = document.querySelector(`.matrix-select[data-co="${r}"][data-col="${c}"]`);
            const selectVal = select ? select.value : "-";
            rowData += `,"${selectVal || "-"}"`;
        }
        csvRows.push(rowData);
    }

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "CO_PO_Mapping_Matrix.csv");
    link.style.visibility = "hidden";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}