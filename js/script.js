const overview = document.querySelector(".overview");
const username = "kayharr";
const repoList = document.querySelector(".repo-list");

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
    repoInfo(repoData);
};

repoFetch();

const repoInfo = function (repos) {
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3> ${repo.name}<h3>`;
        repoList.append(repoItem);
    }
};