const overview = document.querySelector(".overview");
const username = "kayharr";
const repoList = document.querySelector(".repo-list");
const repoGroup = document.querySelector(".repos");
const specificRepo = document.querySelector(".repo-data");

const gitUserData = async function () {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    userInfo(data);
};

gitUserData();

const userInfo = function (data) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("user-info");
    newDiv.innerHTML = `    
    <figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>
    `;
    overview.append(newDiv); 
};

const repoFetch = async function () {
    const fetchRepo = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepo.json(); 
    repoDetails(repoData);
};

repoFetch();

const repoDetails = function (repos) {
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3> ${repo.name}<h3>`;
        repoList.append(repoItem);
    }
};

repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        repoPullInfo(repoName);
    }
});

const repoPullInfo = async function (repoName) {
    const grabRepos = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await grabRepos.json();
    console.log(repoInfo);

    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    console.log(languageData);

    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    }
    // console.log(languages);
    displayRepo(repoInfo, languages);
};

const displayRepo = function (repoInfo, languages) {
    specificRepo.innerHTML = "";
    specificRepo.classList.remove("hide");
    repoGroup.classList.add("hide");
    const div = document.createElement("div");
    div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    specificRepo.append(div);
};

