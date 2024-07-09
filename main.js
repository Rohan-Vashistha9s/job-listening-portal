"use strict";

import { users } from "./users.js";

const $main = document.querySelector("#container-main");
let techsCounter = 0;

const usersObj = {};

users.forEach(user => {
   

    $main.insertAdjacentHTML(
        "beforeend",
        `
            <div class="user" id="user${user.id}">
                <div class="media__top">

                
                    <div class="user__l1-logo">
                        <image class="user__l2-logo" src="${user.logo}" alt="company name"> </image>
                    </div>
                

                    <div class="user__l1-company">
                        <div class="user__l2-company">
                            ${user.company}
                        </div>

                        <div class="user__l2-new user__l2-notifications hidden">
                            NEW!
                        </div>

                        <div class="user__l2-featured user__l2-notifications hidden">
                            FEATURED
                        </div>
                    </div>


                    <div class="user__l1-position">
                        <div class="user__l2-position">
                            ${user.position}
                        </div>
                    </div>


                    <div class="user__l1-information">
                        <div class="user__l2-posted">
                            ${user.postedAt}
                        </div>

                        <div class="user__l2-contract">
                            ${user.contract}
                        </div>

                        <div class="user__l2-location">
                            ${user.location}
                        </div>
                    </div>

                </div>

                <div class="media__bottom">
                    <div class="user__hr"></div>
                    <div class="user__l1-techs"></div>
                </div>
            </div>
   
    `
    );

    if (user.new) {
        const userL2New = document.querySelectorAll(".user__l2-new");
        userL2New[userL2New.length - 1].classList.toggle("hidden");
    }

    if (user.featured) {
        const userL2Featured = document.querySelectorAll(".user__l2-featured");
        userL2Featured[userL2Featured.length - 1].classList.toggle("hidden");
    }

    let $user = document.querySelectorAll(".user");

    if (user.new && user.featured) {
        $user[$user.length - 1].classList.toggle('border-left');
    }

    const $userL1TechsAll = document.querySelectorAll('.user__l1-techs');



    $userL1TechsAll[techsCounter].insertAdjacentHTML('beforeend', `
        <div class="user__l2-tech ${user.role.toLowerCase()}">
            ${user.role}
        </div>
    `);

    
    $userL1TechsAll[techsCounter].insertAdjacentHTML('beforeend', `
        <div class="user__l2-tech ${user.level.toLowerCase()}">
            ${user.level}
        </div>
    `);


    user.languages.forEach(lang => {
        $userL1TechsAll[techsCounter].insertAdjacentHTML('beforeend', `
            <div class="user__l2-tech ${lang.toLowerCase()}">
                ${lang}
            </div>
        `);  
    });

    user.tools.forEach(tool => {
        $userL1TechsAll[techsCounter].insertAdjacentHTML('beforeend', `
            <div class="user__l2-tech ${tool.toLowerCase()}">
                ${tool}
            </div>
        `);  
    });

    techsCounter++;


    usersObj[user.id] = new Array();
    usersObj[user.id].push(user.role.toLowerCase());
    usersObj[user.id].push(user.level.toLowerCase());

    user.languages.forEach(lang => {
        usersObj[user.id].push(lang.toLowerCase());
    });
    user.tools.forEach(tool => {
        usersObj[user.id].push(tool.toLowerCase());
    });

});


const $userL2TechAll = document.querySelectorAll('.user__l2-tech');

const $filtersL1Content = document.querySelector('.filters__l1-content');

let filterButtonsArray = [];

$userL2TechAll.forEach(filterButton => {
    filterButton.addEventListener('click', () => {

        if (!filterButtonsArray.includes(filterButton.textContent.trim().toLowerCase())) {
            $filtersL1Content.insertAdjacentHTML('beforeend', `
                <div class="user__l2-tech-filter ${filterButton.textContent.trim().toLowerCase()} ${filterButton.textContent.trim().toLowerCase()}--filter">
                    ${filterButton.textContent.trim()}
                    <div class="filters__cross filters__cross--${filterButton.textContent.trim().toLowerCase()}"> </div>
                </div>
            `);    

            filterButtonsArray.push(filterButton.textContent.trim().toLowerCase());
            document.querySelector('.filters').classList.remove('hidden');

            

            document.querySelector(`.filters__cross--${filterButton.textContent.trim().toLowerCase()}`)
            .addEventListener('click', () => {
                
                document.querySelector(`.${filterButton.textContent.trim().toLowerCase()}--filter`).remove();
                
                filterButtonsArray.splice(filterButtonsArray.indexOf(filterButton.textContent.trim().toLowerCase(), 0), 1);   
                

                if (filterButtonsArray.length === 0) {
                    
                    document.querySelector('.filters').classList.toggle('hidden');
                    
                    document.querySelectorAll('.user').forEach(user => {
                        user.classList.remove('hidden');
                    });
                }
    
                

                for (let key in usersObj) {
                    let filterInCounter = 0;
                    for (let filter of filterButtonsArray) {
                        if (!usersObj[key].includes(filter)) {
                            document.querySelector(`#user${key}`).classList.add('hidden');
                        } else {
                            filterInCounter++;
                            if (filterInCounter >= filterButtonsArray.length) {
                                document.querySelector(`#user${key}`).classList.remove('hidden');
  
                            }
                            
                        }
                    }
                }           
                
   
            });
        }

        for (let key in usersObj) {
            if (!usersObj[key].includes(filterButton.textContent.trim().toLowerCase())) {
                document.querySelector(`#user${key}`).classList.add('hidden');
            }
        }
    });
});





const $filtersL1Clear = document.querySelector('.filters__l1-clear');
$filtersL1Clear.addEventListener('click', () => {
    $filtersL1Content.textContent = '';
    filterButtonsArray = [];
    document.querySelector('.filters').classList.toggle('hidden');
    document.querySelectorAll('.user').forEach(user => {
        user.classList.remove('hidden');
    });
});


