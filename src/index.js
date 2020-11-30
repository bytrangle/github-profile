import './styles.css';

const convertTime = (date) => {
  const givenDate = new Date(date);
  const options = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timezoneName: 'short',
  };
  const relativeTime = givenDate.toLocaleString('en-us', options);
  const dateOnly = relativeTime.slice(0, relativeTime.indexOf(','));
  const now = new Date();
  const dateDiffInMilliSecs = Math.abs(now - givenDate);
  const dateDiffInDays = Math.ceil(dateDiffInMilliSecs / (24 * 60 * 60 * 1000));
  const updatedTime = dateDiffInDays <= 7 ? `${dateDiffInDays} days ago` : `on ${dateOnly}`;
  return { relativeTime, updatedTime };
};
window.addEventListener('DOMContentLoaded', (event) => {
  const reposSection = document.getElementById('user-repositories-list');
  const reposUl = reposSection.querySelector('ul');
  console.log('DOM fully loaded and parsed');
  fetch('/api')
    .then((response) => response.json())
    .then((json) => {
      const { data } = json;
      console.log(json.data);
      if (data) {
        const repoTemplate = document.getElementById('user-repository-item');
        const statsTemplate = document.getElementById('user-reposiroty-stats');
        data.forEach((e) => {
          const { name, pushedAt, url, stargazerCount, forkCount } = e;
          // Clone the li element and insert it into the unorder list for displaying repos
          const repoClone = repoTemplate.content.cloneNode(true);
          const nameElem = repoClone.querySelector('h3 a');
          nameElem.setAttribute('href', url);
          nameElem.textContent = name;
          // Account for the scenario that some repos are initialized, but never contains a code and therefore the languages field is empty
          const mainLanguage = e.languages?.nodes[0]?.name;
          const mainLanguageColor = e.languages?.nodes[0]?.color;
          if (mainLanguage) {
            const languageElem = repoClone.querySelector('span[itemprop="programmingLanguage"]');
            languageElem.innerText = mainLanguage;
            const languageColorElem = repoClone.querySelector('.repo-language-color');
            languageColorElem.style.backgroundColor = mainLanguageColor;
          }
          if (stargazerCount > 0 || forkCount > 0) {
            const statsClone = statsTemplate.content.cloneNode(true);
            const starElem = statsTemplate.querySelector('a:first-child');
            const forkElem = statsClone.querySelector('a:nth-child(2)');
            if (stargazerCount > 0) {
              starElem.setAttribute('href', `${url}/stargazers`);
              starElem.innerText = stargazerCount;
            } else {
              statsClone.removeChild(starElem);
            }
            if (forkCount > 0) {
              forkElem.setAttribute('href', `${url}/network/members`);
              forkElem.innerText = forkCount;
            } else {
              statsClone.removeChild(forkElem);
            }
          }
          const dateElem = repoClone.querySelector('relative-time');
          const { relativeTime, updatedTime } = convertTime(pushedAt);
          dateElem.setAttribute('datetime', pushedAt);
          dateElem.setAttribute('title', relativeTime);
          dateElem.innerText = updatedTime;
          reposUl.appendChild(repoClone);
        });
      } else {
        reposSection.insertAdjacentHTML(
          'afterbegin',
          '<p>The user has no repository to display</p>'
        );
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      // Remove the loading indicator no matter the outcome of the API call.
      const loadingSection = reposSection.querySelector('.loading');
      loadingSection.outerHTML = '';
    });
});
