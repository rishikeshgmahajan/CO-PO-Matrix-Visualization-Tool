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
                                <textarea class='form-inp' placeholder='Enter CO description...'></textarea>
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
                                <textarea class='form-inp' placeholder='Enter PO description...'></textarea>
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
                                <textarea class='form-inp' placeholder='Enter PSO description...'></textarea>
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

    if(!tableHeadRow1 || !tableHeadRow2 || !tableBody) return;

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

        for (let i = 1; i <= poCount; i++) {
            tableHeadRow2.innerHTML += `<th>PO${i}</th>`;
        }
    }
    
    if (psoCount > 0) {
        const psoHeader = document.createElement("th");
        psoHeader.setAttribute("colspan", psoCount);
        psoHeader.className = "group-heading pso-group-heading";
        psoHeader.innerText = "Program Specific Outcomes (PSOs)";
        tableHeadRow1.appendChild(psoHeader);

        for (let i = 1; i <= psoCount; i++) {
            tableHeadRow2.innerHTML += `<th>PSO${i}</th>`;
        }
    }
    
    const totalColumns = poCount + psoCount;

    for (let r = 1; r <= coCount; r++) {
        const row = document.createElement("tr");

        let rowHTML = `
            <td class="sticky-col co-label-cell">
                <strong>CO ${r}</strong>
            </td>
        `;

        for (let c = 1; c <= totalColumns; c++) {
            const cellKey = `${r}-${c}`;
            const savedVal = savedValues[cellKey] || "";

            rowHTML += `
                <td>
                    <select class="matrix-select" data-co="${r}" data-col="${c}" onchange="styleActiveCell(this)">
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

    document.querySelectorAll(".matrix-select").forEach(select => {
        if (select.value !== "") {
            styleActiveCell(select);
        }
    });
}

function styleActiveCell(selectElement) {
    selectElement.classList.remove("has-value", "val-1", "val-2", "val-3");

    if (selectElement.value !== "") {
        selectElement.classList.add("has-value");
        selectElement.classList.add(`val-${selectElement.value}`);
    }
}