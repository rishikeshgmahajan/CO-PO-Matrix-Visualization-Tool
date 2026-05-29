document.addEventListener("DOMContentLoaded", () => {
    tippy('[data-tippy-content]'); 
});

document.addEventListener("DOMContentLoaded", () => {
    const tabLinks = document.querySelectorAll(".tab-link");
    const tabPanes = document.querySelectorAll(".tab-pane");

    tabLinks.forEach(link => {
        link.addEventListener("click", function() {
            tabLinks.forEach(item => item.classList.remove("active"));
            tabPanes.forEach(pane => pane.classList.remove("active"));

            this.classList.add("active");

            const targetPaneId = this.getAttribute("data-tab");
            document.getElementById(targetPaneId).classList.add("active");
        });
    });
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
                        <textarea class='form-control' placeholder='Enter CO description...'></textarea>
                    </div>`;
    document.getElementById("co-mapping-list").insertAdjacentHTML("beforeend", coBoxHTML);
    document.getElementById("co-count").textContent = coCount;
}

function addPO() {
    poCount++;
    let poBoxHTML = `<div class='o-box' id='po-${poCount}'>
                        <div class='o-header'>
                            <span class='o-title'>PO ${poCount}</span>
                        </div>
                        <textarea class='form-control' placeholder='Enter PO description...'></textarea>
                    </div>`;
    document.getElementById("po-mapping-list").insertAdjacentHTML("beforeend", poBoxHTML);
    document.getElementById("po-count").textContent = poCount;
}

function addPSO() {
    psoCount++;
    let psoBoxHTML = `<div class='o-box' id='pso-${psoCount}'>
                        <div class='o-header'>
                            <span class='o-title'>PSO ${psoCount}</span>
                        </div>
                        <textarea class='form-control' placeholder='Enter PSO description...'></textarea>
                    </div>`;
    document.getElementById("pso-mapping-list").insertAdjacentHTML("beforeend", psoBoxHTML);
    document.getElementById("pso-count").textContent = psoCount;
}

function deleteLastCO() {
    if (coCount > 0) {
        document.getElementById(`co-${coCount}`).remove();
        coCount--;
    }
    document.getElementById("co-count").textContent = coCount;
}

function deleteLastPO() {
    if (poCount > 0) {
        document.getElementById(`po-${poCount}`).remove();
        poCount--;
    }
    document.getElementById("po-count").textContent = poCount;
}

function deleteLastPSO() {
    if (psoCount > 0) {
        document.getElementById(`pso-${psoCount}`).remove();
        psoCount--;
    }
    document.getElementById("pso-count").textContent = psoCount;
}
function Matrix() {
    const Row1 = document.getElementById("MatrixRow1");
    const Row2 = document.getElementById("MatrixRow2");
    const body = document.getElementById("MatrixBody");
    if(! Row1 || !Row2 || !body) return;

    const COCount = document.querySelectorAll('.control-panel-card textarea, [id^="CO"], .co-card').length ||3;
    const POCount = document.querySelectorAll('po-card, .po-input-group').length || 12;
    const PSOCount = document.querySelectorAll('pso-card, .pso-input-group').length || 3;
    Row1.innerHTML = '<th rowspan="2" class="sticky-col col-co-heading">Course Outcomes</th>';\
    Row2.innerHTML = '';
    Body.innerHTML = '';

    if(POCount >0){
        const POHeader = document.createElement("th");
        POHeader.setAttribute("colspan", POCount);
        POHeader.innerText = "Program Outcomes (PO)";
        Row1.appendChild(POHeader);
        for(let i=0; i<= POCount; i++){
            Row2.innerHTML+= '<th>PO${i}</th>';
        }
    }
    if(PSOCount > 0){
        const PSOHeader = document.createElement("th");
        PSOHeader.setAttribute("colspan", PSOCount);
        PSOHeader.classname = "group-heading pso-group-heading";
        PSOHeader.innerText = "Program Specific Outcomes(PSOs)";
        for(let i=0; i<=PSOCount; i++) {
            const row = document.createElement("tr");
        }
    }
    for(let r=1; r<= COCount; r++){
        const row = document.createElement("tr");
        let rowHTML = `<td class="sticky-col co-label-cell">
        <strong>CO ${r}</strong>
        <span class="co-subtext-node">Course mapping target criteria metrics...</span>
        </td>`;

        const totalColumns = POCount + PSOCount;

        for(let c=1; c<=totalColumns; c++){
            const cellID = 'cell-r${r}';
            rowHTML += `
            <td>
            <select id = "${cellID}" class = "matrix-select" onchange="styleActiveCell(this)">
                <option value="" selected>-</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
            </td>
            `;
        }
        row.innerHTML = rowHTML;
        Body.appendChild(row);
    }
}
function styleActiveCell(selectElement) {
    if (selectElement.value !== "") {
        selectElement.classList.add("has-value");
    } else {
        selectElement.classList.remove("has-value");
    }
}
window.addEventListener("DOMContentLoaded", syncMatrix);



                


