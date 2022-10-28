//variables

let mainHeader = document.querySelector('#main-header'),
    closeBtn = document.querySelector('.close-btn')
    closeNavDrawer = document.querySelector('.close-nav-drawer')
// mobile navigation

function dropdown() {
    const all = document.querySelectorAll(':not(.drop-set)');
    all.forEach( el => {
        el.addEventListener('click', (e) => {
            // console.log('click')
        const allDrop = document.querySelectorAll('[data-drop-down]');
        for (let i = 0; i< allDrop.length; i++) {
            allDrop[i].classList.remove('active')
        }

            e.stopPropagation();
            
        });
    });
    // document.addEventListener('click', (e) => {
        
        
    // })

    let dropwrap  = document.querySelectorAll('.drop-down');
    if(dropwrap[0] != null) {
        dropwrap.forEach( drop => {
            drop.querySelector('button').addEventListener('click', (e) =>{
                e.stopPropagation();
                const allDrop = document.querySelectorAll('[data-drop-down]')
                    for (let i = 0; i< allDrop.length; i++) {
                        if ( drop.querySelector('[data-drop-down]').classList.contains('active')) {
                            drop.querySelector('[data-drop-down]').classList.add('active')
                        }else {
                            allDrop[i].classList.remove('active')
                        }
                    }
                drop.querySelector('[data-drop-down]').classList.toggle('active')
                e.preventDefault();
            })
        });
    }

    
}

// using all functions
dropdown();

