// HTML Elements Variable
const welcomePortfolio = document.getElementById("welcome-portfolio");
const welcomeName = document.getElementById("welcome-name");
const profileSkills = document.getElementById("profile-skills");
const CertificatesBtn = document.getElementById("portfolio-btn-certificates");
const ProjectBtn = document.getElementById("portfolio-btn-projects");
const certificatesBlock = document.getElementById("portfolio-certificates");
const projectsBlock = document.getElementById("portfolio-project");
const PaginationBlock = document.getElementById("content-pagination");

// Variables
let portfolioData = [];
const perPageCount = getPerPageCount();
let currentCertPage = 0;
let currentProjPage = 0;

// Functions
const textScramble = (text, element) => {
    const chars = "!@#$%^&*()_+{}[]ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let iterations = 0;
    const maxIterations = text.length;
    const intervalTime = 50;
    const interval = setInterval(() => {
        let scrambled = "";

        for (let i = 0; i < text.length; i++) {
            if (i < iterations) {
                scrambled += text[i];
            } else {
                scrambled += chars[Math.floor(Math.random() * chars.length)];
            }
        }
        element.textContent = scrambled;
        iterations++;
        if (iterations > maxIterations) {
            clearInterval(interval);
        }
    }, intervalTime);
};
function getPerPageCount() {
    if (window.innerWidth <= 767) {
        return 2;
    }
    return 3;
}
const skillColor = (skill) => {
    const colors = {
        "Java": "#ffbd59",
        "C++ (Arduino)": "#019b9e",
        "SQL": "#ff5757",
        "DRL (Doosan Robot Language)": "#045aad",
        "PLC Ladder Logic": "#026ab8",
        "Python": "#3572a5",
        "HTML": "#ff914d",
        "CSS": "#5271ff",
        "JS": "#ffde59",
        "C#": "#5e17eb",
        "Bootstrap": "#7c2af3",
        "jQuery": "#3480ad",
        "SASS": "#c0648e",
        "React": "#76d6f8",
        "Redux": "#805bbe",
    };
    return colors[skill] || "#ccc";
};
const loadSkillsData = () => {
    fetch('portfolioData.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load JSON file');
            }
            return response.json();
        })
        .then(data => {
            portfolioData = data;
            showSkillsData();
            showCertificates(currentCertPage);
        })
        .catch(error => {
            console.error('Error fetching portfolio data:', error);
        });
};
const showSkillsData = () => {
    profileSkills.innerHTML = "";
    profileSkills.innerHTML += `<h1>Skills</h1>`;
    portfolioData.skills.forEach(skillObj => {
        const skill = skillObj.name;
        profileSkills.innerHTML += `
        <p class="skill" style="background-color: ${skillColor(skill)}; display: inline-block; margin-left: 8px;">
            ${skill}
        </p>`;
    });
    profileSkills.innerHTML += `<h1>Currently Learning</h1>`;
    portfolioData.upskilling.forEach(skillObj => {
        const skill = skillObj.name;
        profileSkills.innerHTML += `
        <p class="skill" style="background-color: ${skillColor(skill)}; display: inline-block; margin-left: 8px;">
            ${skill}
        </p>`;
    });
};
const showCertificates = (page) => {
    certificatesBlock.innerHTML = '';
    PaginationBlock.innerHTML = '';

    const start = page * perPageCount;
    const end = start + perPageCount;
    const currentCertificates = portfolioData.certificates.slice(start, end);

    const rowDiv = document.createElement('div');
    rowDiv.classList.add('content-row');

    currentCertificates.forEach(certificate => {
        const certDiv = document.createElement('div');
        certDiv.classList.add('content-card');

        const img = document.createElement('img');
        img.src = certificate.img;
        img.alt = certificate.name;
        img.classList.add('content-img');

        const name = document.createElement('p');
        name.textContent = certificate.name;
        name.classList.add('content-name');
        name.style.fontWeight = "bold";

        const skillsContainer = document.createElement('div');
        skillsContainer.classList.add('content-skills');

        certificate.skills.forEach(skill => {
            const skillTag = document.createElement('p');
            skillTag.textContent = skill.name;
            skillTag.classList.add('skill');
            skillTag.style.backgroundColor = skillColor(skill.name);
            skillTag.style.display = 'inline-block';
            skillTag.style.marginLeft = '8px';
            skillsContainer.appendChild(skillTag);
        });

        certDiv.appendChild(img);
        certDiv.appendChild(name);
        certDiv.appendChild(skillsContainer);

        rowDiv.appendChild(certDiv);
    });

    certificatesBlock.appendChild(rowDiv);

    const totalPages = Math.ceil(portfolioData.certificates.length / perPageCount);
    createPaginationDots(totalPages, page, showCertificates);
};

const showProjects = (page) => {
    projectsBlock.innerHTML = '';
    PaginationBlock.innerHTML = '';

    const start = page * perPageCount;
    const end = start + perPageCount;
    const currentProjects = portfolioData.projects.slice(start, end);

    const rowDiv = document.createElement('div');
    rowDiv.classList.add('content-row');

    currentProjects.forEach(project => {
        const projDiv = document.createElement('div');
        projDiv.classList.add('content-card');

        const img = document.createElement('img');
        img.src = project.img;
        img.alt = project.name;
        img.classList.add('content-img');

        const name = document.createElement('p');
        name.textContent = project.name;
        name.classList.add('content-name');
        name.style.fontWeight = "bold";

        const skillsContainer = document.createElement('div');
        skillsContainer.classList.add('content-skills');

        project.skills.forEach(skill => {
            const skillTag = document.createElement('p');
            skillTag.textContent = skill.name;
            skillTag.classList.add('skill');
            skillTag.style.backgroundColor = skillColor(skill.name);
            skillTag.style.display = 'inline-block';
            skillTag.style.marginLeft = '8px';
            skillsContainer.appendChild(skillTag);
        });

        projDiv.appendChild(img);
        projDiv.appendChild(name);
        projDiv.appendChild(skillsContainer);

        rowDiv.appendChild(projDiv);
    });
    projectsBlock.appendChild(rowDiv);

    const totalPages = Math.ceil(portfolioData.projects.length / perPageCount);
    createPaginationDots(totalPages, page, showProjects);
}

const createPaginationDots = (totalPages, currentPage, onPageClick) => {
    PaginationBlock.innerHTML = '';

    for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === currentPage) dot.classList.add('active');

        dot.addEventListener('click', () => {
            onPageClick(i);
        });

        PaginationBlock.appendChild(dot);
    }
};


// Event Listeners
CertificatesBtn.addEventListener("click", () => {
    CertificatesBtn.classList.add("active");
    ProjectBtn.classList.remove("active");

    certificatesBlock.classList.add("active");
    projectsBlock.classList.remove("active");

    currentCertPage = 0;
    showCertificates(currentCertPage);
});

ProjectBtn.addEventListener("click", () => {
    ProjectBtn.classList.add("active");
    CertificatesBtn.classList.remove("active");

    projectsBlock.classList.add("active");
    certificatesBlock.classList.remove("active");

    currentProjPage = 0;
    showProjects(currentProjPage);
});

// Initialization
textScramble("Welcome to my Personal Website", welcomePortfolio);
textScramble("Sicat, Revin F.", welcomeName);
loadSkillsData();
