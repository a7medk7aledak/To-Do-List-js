let theInput,Button,reposData;
theInput = document.querySelector(".get-repos input")
Button = document.querySelector("button")
reposData = document.querySelector(".show-data")
Button.onclick = function () {
    if(theInput.value === "")
        reposData.innerHTML = "Please Write Github Username";
    else { 
        fetch(`https://api.github.com/users/${theInput.value}/repos`)
        .then((response)=>response.json())
        .then((repos)=> {
            reposData.innerHTML = "";
            repos.forEach(repo => {
                // create repos
                let div = document.createElement("div");
                div.innerHTML = repo.name;
                // create URL
                let theUrl = document.createElement("a");
                theUrl.innerHTML = "Visit";
                theUrl.href = `https://api.github.com/users/${theInput.value}/${repo.name}`
                theUrl.setAttribute('target','_blank');
                div.appendChild(theUrl)
                // create stars
                let stars = document.createElement('span')
                stars.innerHTML = `stars ${repo.stargazers_count}`;
                div.append(stars)
                div.className = 'repo-box';
                reposData.appendChild(div)
            });
        })
    }
}
