'use strict';
const dateArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const input = document.querySelector('.search-input');
const link = document.querySelector('.profile-link');

function fetchApi() {
    const error = document.querySelector('.error');
    fetch(`https://api.github.com/users/${input.value}`)
        .then(res => {
            if(res.ok){
                error.style.display = 'none';
                input.style.width = '60%';
                return res.json()
            } else{
                error.style.display = 'block';
                input.style.width = '35%';
                throw new Error("Status code error : " + res.status);
            }
        })
        .then(data => {
            console.log(data);
            updateData(data);
        })
}

function updateData(data) {
    const username = document.querySelector('.main-title');
    const avatar = document.querySelector('.avatar');
    const social = document.querySelector('.social');
    const date = document.querySelector('.date-join');
    const bio = document.getElementById('profile-bio');
    const repos = document.querySelector('.repos-number');
    const followers = document.getElementById('followers');
    const following = document.getElementById('following');
    const location = document.querySelector('.location');
    const twitter = document.querySelector('.twitter');
    const company = document.querySelector('.company');
    let dates = data.created_at.split("-");
    let day = dates[2].split('T');

    username.textContent = (data.name == null) ? data.login : data.name;
    social.textContent = `@${data.login}`;
    avatar.setAttribute('src', `${data.avatar_url}`);
    date.textContent = `Joined ${day[0]} ${dateArr[Number(dates[1]) - 1]} ${dates[0]}`;
    bio.textContent = data.bio;
    repos.textContent = data.public_repos;
    followers.textContent = data.followers;
    following.textContent = data.following;
    location.textContent = (data.location == null) ? 'Not available' : data.location;
    link.textContent = data.html_url;
    link.href = data.html_url;
    twitter.textContent = (data.twitter_username == null) ? 'Not available' : data.twitter_username;
    company.textContent = (data.company == null) ? 'Not available' : data.company;
}

function getInput() {
    const search = document.querySelector('.search-button');
    search.addEventListener('click', () => {
        fetchApi();
    })
}

function mode(){
    const container = document.querySelector('.header-container');
    const body = document.querySelector('body');
    const wrapper = document.querySelectorAll('.wrapper');
    const repos = document.querySelector('.repos');
    const footerLogo = document.querySelectorAll('.footer-logo');
    const dark = document.querySelectorAll('.dark-mode');
    const light = document.querySelectorAll('.light-mode');
    container.addEventListener('click', ()=>{
        body.classList.toggle('body-light');
        body.classList.toggle('body-dark');

        wrapper.forEach((element) => {
            element.classList.toggle('wrapper-dark');
            element.classList.toggle('wrapper-light');
        });

        repos.classList.toggle('repos-light');
        repos.classList.toggle('repos-dark');

        footerLogo.forEach((element) => {
            element.classList.toggle('svg-light');
        });

        input.classList.toggle('search-input-light');

        link.classList.toggle('link-dark');

        dark.forEach((element) => {
            element.classList.toggle('not-active');
        });

        light.forEach((element) => {
            element.classList.toggle('not-active');
        });
    })
}

getInput();
mode();