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
    document.getElementById("co-mapping").insertAdjacentHTML("beforeend", coBoxHTML);
}

function addPO() {
    poCount++;
    let poBoxHTML = `<div class='o-box' id='po-${poCount}'>
                        <div class='o-header'>
                            <span class='o-title'>PO ${poCount}</span>
                        </div>
                        <textarea class='form-control' placeholder='Enter PO description...'></textarea>
                    </div>`;
    document.getElementById("po-mapping").insertAdjacentHTML("beforeend", poBoxHTML);
}

function addPSO() {
    psoCount++;
    let psoBoxHTML = `<div class='o-box' id='pso-${psoCount}'>
                        <div class='o-header'>
                            <span class='o-title'>PSO ${psoCount}</span>
                        </div>
                        <textarea class='form-control' placeholder='Enter PSO description...'></textarea>
                    </div>`;
    document.getElementById("pso-mapping").insertAdjacentHTML("beforeend", psoBoxHTML);
}

function deleteLastCO() {
    if (coCount > 0) {
        document.getElementById(`co-${coCount}`).remove();
        coCount--;
    }
}

function deleteLastPO() {
    if (poCount > 0) {
        document.getElementById(`po-${poCount}`).remove();
        poCount--;
    }
}

function deleteLastPSO() {
    if (psoCount > 0) {
        document.getElementById(`pso-${psoCount}`).remove();
        psoCount--;
    }
}