// Dark mode functionality
const darkModeToggle = document.getElementById('darkModeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Initialize dark mode based on user preference or localStorage
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
    darkModeToggle.checked = true;
} else if (currentTheme === 'light') {
    document.body.setAttribute('data-theme', 'light');
    darkModeToggle.checked = false;
} else if (prefersDarkScheme.matches) {
    document.body.setAttribute('data-theme', 'dark');
    darkModeToggle.checked = true;
}

// Toggle dark mode
darkModeToggle.addEventListener('change', function() {
    if (this.checked) {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
});

const dupeResults = [];
        const semestersList = [
            { "semesterId": "244", "semesterYear": 2024, "semesterName": "Short" }, { "semesterId": "243", "semesterYear": 2024, "semesterName": "Fall" }, { "semesterId": "242", "semesterYear": 2024, "semesterName": "Summer" }, { "semesterId": "241", "semesterYear": 2024, "semesterName": "Spring" }, { "semesterId": "233", "semesterYear": 2023, "semesterName": "Fall" }, { "semesterId": "232", "semesterYear": 2023, "semesterName": "Summer" }, { "semesterId": "231", "semesterYear": 2023, "semesterName": "Spring" }, { "semesterId": "223", "semesterYear": 2022, "semesterName": "Fall" }, { "semesterId": "222", "semesterYear": 2022, "semesterName": "Summer" }, { "semesterId": "221", "semesterYear": 2022, "semesterName": "Spring" }, { "semesterId": "213", "semesterYear": 2021, "semesterName": "Fall" }, { "semesterId": "212", "semesterYear": 2021, "semesterName": "Summer" }, { "semesterId": "211", "semesterYear": 2021, "semesterName": "Spring" }, { "semesterId": "203", "semesterYear": 2020, "semesterName": "Fall" }, { "semesterId": "202", "semesterYear": 2020, "semesterName": "Summer" }, { "semesterId": "201", "semesterYear": 2020, "semesterName": "Spring" }, { "semesterId": "193", "semesterYear": 2019, "semesterName": "Fall" }, { "semesterId": "192", "semesterYear": 2019, "semesterName": "Summer" }, { "semesterId": "191", "semesterYear": 2019, "semesterName": "Spring" }, { "semesterId": "183", "semesterYear": 2018, "semesterName": "Fall" }, { "semesterId": "182", "semesterYear": 2018, "semesterName": "Summer" }, { "semesterId": "181", "semesterYear": 2018, "semesterName": "Spring" }, { "semesterId": "173", "semesterYear": 2017, "semesterName": "Fall" }, { "semesterId": "172", "semesterYear": 2017, "semesterName": "Summer" }, { "semesterId": "171", "semesterYear": 2017, "semesterName": "Spring" }, { "semesterId": "163", "semesterYear": 2016, "semesterName": "Fall" }, { "semesterId": "162", "semesterYear": 2016, "semesterName": "Summer" }, { "semesterId": "161", "semesterYear": 2016, "semesterName": "Spring" }, { "semesterId": "153", "semesterYear": 2015, "semesterName": "Fall" }, { "semesterId": "152", "semesterYear": 2015, "semesterName": "Summer" }, { "semesterId": "151", "semesterYear": 2015, "semesterName": "Spring" }, { "semesterId": "143", "semesterYear": 2014, "semesterName": "Fall" }, { "semesterId": "142", "semesterYear": 2014, "semesterName": "Summer" }, { "semesterId": "141", "semesterYear": 2014, "semesterName": "Spring" }, { "semesterId": "133", "semesterYear": 2013, "semesterName": "Fall" }, { "semesterId": "132", "semesterYear": 2013, "semesterName": "Summer" }, { "semesterId": "131", "semesterYear": 2013, "semesterName": "Spring" }, { "semesterId": "123", "semesterYear": 2012, "semesterName": "Fall" }, { "semesterId": "122", "semesterYear": 2012, "semesterName": "Summer" }, { "semesterId": "121", "semesterYear": 2012, "semesterName": "Spring" }, { "semesterId": "113", "semesterYear": 2011, "semesterName": "Fall" }, { "semesterId": "112", "semesterYear": 2011, "semesterName": "Summer" }, { "semesterId": "111", "semesterYear": 2011, "semesterName": "Spring" }, { "semesterId": "103", "semesterYear": 2010, "semesterName": "Fall" }, { "semesterId": "102", "semesterYear": 2010, "semesterName": "Summer" }, { "semesterId": "101", "semesterYear": 2010, "semesterName": "Spring" }, { "semesterId": "093", "semesterYear": 2009, "semesterName": "Fall" }, { "semesterId": "092", "semesterYear": 2009, "semesterName": "Summer" }, { "semesterId": "091", "semesterYear": 2009, "semesterName": "Spring" }, { "semesterId": "083", "semesterYear": 2008, "semesterName": "Fall" }
        ];

        function calculateSgpaManual(semester) {
            let sc = 0;
            let weighted = 0;
            let semesterName = "";
            let semesterYear = 0;
            let wa = 0;

            for (let c of semester) {
                if (c["gradeLetter"] != "F") {
                    semesterName = c["semesterName"];
                    semesterYear = c["semesterYear"];
                    weighted = weighted + c?.totalCredit * c?.pointEquivalent;
                    sc = sc + Number(c["totalCredit"]);
                }
            }
            wa = Number((weighted / sc).toFixed(2));

            return [semesterName, semesterYear, sc, wa];
        }

        async function getStudentInfo(id) {
            const results = [];
            try {
                for (const semester of semestersList) {
                    try {
                        const response = await fetch(`http://software.diu.edu.bd:8006/result?grecaptcha=&semesterId=${semester.semesterId}&studentId=${id}`);
                        if (response.ok) {
                            const data = await response.json();
                            if (data && Object.keys(data).length > 0) {
                                const semesterResults = data.map(course => ({
                                    ...course,
                                    semesterName: semester.semesterName,
                                    semesterYear: semester.semesterYear
                                }));
                                results.push(semesterResults);
                            }
                        }
                    } catch (error) {
                        console.log(`Failed to fetch semester ${semester.semesterId}:`, error);
                    }
                }

                if (results.length === 0) {
                    throw new Error("No results found for this ID");
                }

                return {
                    inc: 0,
                    studentInfoObj: {
                        id: id,
                        name: results[0][0]?.studentName || "Student"
                    },
                    semesterResults: results
                };
            } catch (error) {
                throw error;
            }
        }

        // Previous code remains same until calculateCgpa function

        async function calculateCgpa(id, improvement, checkProject, projectCredit, projectResult) {
            const { studentInfoObj, semesterResults } = await getStudentInfo(id);
            let totalCredits = 0;
            let totalWeightedPoints = 0;
            const resultsList = [];
            const processedCourses = new Map(); // To track highest grades for improvement cases

            // Process each semester
            for (let semester of semesterResults) {
                let semesterCredits = 0;
                let semesterWeightedPoints = 0;
                let semesterName = semester[0]?.semesterName || "";
                let semesterYear = semester[0]?.semesterYear || "";

                // Process each course in the semester
                for (const course of semester) {
                    const courseId = course.courseId;
                    const credit = Number(course.totalCredit);
                    const gradePoint = Number(course.pointEquivalent);

                    if (improvement) {
                        // For improvement cases, keep track of the highest grade for each course
                        if (!processedCourses.has(courseId) ||
                            processedCourses.get(courseId).gradePoint < gradePoint) {
                            processedCourses.set(courseId, {
                                credit: credit,
                                gradePoint: gradePoint
                            });
                        }
                    } else {
                        // For regular calculation, include all passing grades
                        if (course.gradeLetter !== "F") {
                            semesterCredits += credit;
                            semesterWeightedPoints += credit * gradePoint;
                        }
                    }
                }

                // Calculate semester GPA and add to results
                if (!improvement && semesterCredits > 0) {
                    const sgpa = semesterWeightedPoints / semesterCredits;
                    resultsList.push([semesterName, semesterYear, semesterCredits, sgpa]);
                    totalCredits += semesterCredits;
                    totalWeightedPoints += semesterWeightedPoints;
                }
            }

            // Handle improvement cases
            if (improvement) {
                for (const [_, courseData] of processedCourses) {
                    totalCredits += courseData.credit;
                    totalWeightedPoints += courseData.credit * courseData.gradePoint;
                }
            }

            // Add project if included
            if (checkProject) {
                const projectCreditNum = Number(projectCredit);
                const projectGradePoint = Number(projectResult);
                totalCredits += projectCreditNum;
                totalWeightedPoints += projectCreditNum * projectGradePoint;
                resultsList.push(["Final Year Project", "", projectCreditNum, projectGradePoint]);
            }

            // Calculate final CGPA
            const finalCgpa = totalWeightedPoints / totalCredits;

            // Sort semesters chronologically
            resultsList.sort((a, b) => {
                if (a[1] === b[1]) {
                    const seasonOrder = { Spring: 1, Summer: 2, Fall: 3 };
                    return seasonOrder[a[0]] - seasonOrder[b[0]];
                }
                return Number(a[1]) - Number(b[1]);
            });

            // Format semester data for display
            const semesterData = resultsList.map(([name, year, credits, sgpa]) => {
                const semesterCourses = semesterResults.find(sem =>
                    sem[0]?.semesterName === name &&
                    sem[0]?.semesterYear === year
                ) || [];

                return {
                    name,
                    year,
                    credits,
                    sgpa,
                    courses: semesterCourses
                };
            });

            return {
                studentInfo: studentInfoObj,
                cgpa: Number(finalCgpa.toFixed(2)),
                totalCredits: totalCredits,
                semesters: semesterData
            };
        }

        function displayResults(results) {
            const resultsDiv = document.getElementById('results');

            // Create main CGPA card with summary and graph
            const cgpaHtml = `
        <div class="cgpa-card">
            <div class="student-info">
                <h2>${results.studentInfo.name}</h2>
                <p>ID: ${results.studentInfo.id}</p>
            </div>
            <div class="cgpa-value">${results.cgpa}</div>
            <div class="credit-info">
                Total Credits: ${results.totalCredits}
            </div>
        </div>
        
        <div class="graph-container">
            <div class="summary-section" style="text-align: center; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid #ddd;">
                <h2 style="color: #1a73e8; margin-bottom: 0.5rem;">Overall Performance Summary</h2>
                <div style="font-size: 2.5rem; font-weight: bold; color: #1a73e8;">
                    Overall CGPA: ${results.cgpa}
                </div>
                <div style="display: flex; justify-content: center; gap: 2rem; margin-top: 1rem;">
                    <div>
                        <div style="font-weight: bold; color: #666;">Total Credits</div>
                        <div style="font-size: 1.2rem;">${results.totalCredits}</div>
                    </div>
                    <div>
                        <div style="font-weight: bold; color: #666;">Total Semesters</div>
                        <div style="font-size: 1.2rem;">${results.semesters.length}</div>
                    </div>
                    <div>
                        <div style="font-weight: bold; color: #666;">Latest SGPA</div>
                        <div style="font-size: 1.2rem;">${results.semesters[0]?.sgpa.toFixed(2) || 'N/A'}</div>
                    </div>
                </div>
            </div>
            <canvas id="cgpaChart"></canvas>
        </div>
        
        <div class="semester-results">
            ${results.semesters.map(sem => `
                <div class="semester-card" data-semester='${JSON.stringify(sem)}'>
                    <div class="semester-header">
                        <h3>${sem.name} ${sem.year}</h3>
                    </div>
                    <p>Credits: ${sem.credits}</p>
                    <p>SGPA: ${sem.sgpa}</p>
                </div>
            `).join('')}
        </div>`;

            resultsDiv.innerHTML = cgpaHtml;

            // Create CGPA trend chart
            const ctx = document.getElementById('cgpaChart').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: results.semesters.map(sem => `${sem.name} ${sem.year}`),
                    datasets: [{
                        label: 'SGPA',
                        data: results.semesters.map(sem => sem.sgpa),
                        borderColor: '#1a73e8',
                        tension: 0.1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Semester-wise SGPA Trend'
                        }
                    },
                    scales: {
                        y: {
                            min: 0,
                            max: 4
                        }
                    }
                }
            });

            // Add click handlers for semester cards
            document.querySelectorAll('.semester-card').forEach(card => {
                card.addEventListener('click', () => showSemesterDetails(JSON.parse(card.dataset.semester)));
            });
        }


        function showSemesterDetails(semesterData) {
            const modal = document.getElementById('semesterModal');
            const modalTitle = document.getElementById('modalTitle');
            const modalContent = document.getElementById('modalContent');

            modalTitle.textContent = `${semesterData.name} ${semesterData.year}`;

            const tableHtml = `
        <table class="results-table">
            <thead>
                <tr>
                    <th>Course Code</th>
                    <th>Course Title</th>
                    <th>Credits</th>
                    <th>Grade</th>
                    <th>Grade Point</th>
                </tr>
            </thead>
            <tbody>
                ${semesterData.courses.map(course => `
                    <tr>
                        <td>${course.courseCode}</td>
                        <td>${course.courseTitle}</td>
                        <td>${course.totalCredit}</td>
                        <td>${course.gradeLetter}</td>
                        <td>${course.pointEquivalent}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>`;

            modalContent.innerHTML = tableHtml;
            modal.classList.add('active');
        }

        // Event Listeners
        document.addEventListener('DOMContentLoaded', () => {
            const form = document.getElementById('searchForm');
            const projectCheckbox = document.getElementById('hasProject');
            const projectInputs = document.getElementById('projectInputs');
            const modal = document.getElementById('semesterModal');
            const closeButton = modal.querySelector('.close-button');

            projectCheckbox.addEventListener('change', () => {
                projectInputs.classList.toggle('active', projectCheckbox.checked);
            });

            closeButton.addEventListener('click', () => {
                modal.classList.remove('active');
            });

            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const resultsDiv = document.getElementById('results');
                resultsDiv.innerHTML = '<div class="loading"><div class="loader"></div><p>Calculating CGPA...</p></div>';

                try {
                    const studentId = document.getElementById('studentId').value;
                    const improvement = document.getElementById('improvement').checked;
                    const hasProject = document.getElementById('hasProject').checked;
                    const projectCredit = document.getElementById('projectCredit').value;
                    const projectResult = document.getElementById('projectResult').value;

                    const results = await calculateCgpa(studentId, improvement, hasProject, projectCredit, projectResult);
                    displayResults(results);
                } catch (error) {
                    resultsDiv.innerHTML = `<div class="error">${error.message || 'Failed to calculate CGPA'}</div>`;
                }
            });
        });