class Director {
    constructor() {
        this.projects = [];
        this.employees = [];
        this.quantityOfProjects = 0;
        this.quantityOfEmployees = 0;
    }

    getProjects(day) {
        var num = Math.round(Math.random() * 4);
        if (num > 0)
            for (var i = 0; i <= num - 1; i++)
                this.projects[this.quantityOfProjects++] = new Project(day);
    }

    getEmployees(day, dept) {
        var c;
        if (day != 1) {
            for (var i = 0; i <= this.quantityOfProjects - 1; i++) {
                if ((this.projects[i].dayOfAdding < day) && (this.projects[i].inDevDepartment == false) && (this.projects[i].inTestDepartment == false)) {
                    if (this.projects[i].type == Project.typeOfProject(0))
                        c = 0;
                    else
                        c = 1;
                }
                else if ((this.projects[i].inDevDepartment == true) && (this.projects[i].readyToTest == true)) {
                    c = 2;
                }
                else continue;
                this.employees[this.quantityOfEmployees] = new Employee(Employee.typeOfEmployee(c), this.projects, i);
                dept.getEmployees(this.employees[this.quantityOfEmployees]);
                this.quantityOfEmployees++;
            }
        }
    }

    sentProjectsToDepartment(dept, day) {
        dept.getProjects(this.projects, day);
    }
}

class Department {
    static typeOfDepartment(i) {
        return ['Department of Web Development', 'Department of Mobile Development', 'Department of QA Testing'][i];
    }
    constructor(type) {
        this.type = Department.typeOfDepartment(type);
        this.employees = [];
        this.projects = [];
        this.quantityOfEmployees = 0;
        this.quantityOfFreeEmployees = 0;
        this.quantityOfProjects = 0;

    }
    getQuantityOfEmployees() {
        return this.employees.length;
    }

    getEmployees(emp) {
        this.employees[this.quantityOfEmployees] = emp;
        this.employees[this.quantityOfEmployees].busy = true;
        this.quantityOfEmployees++;
    }

    getProjects(proj, day) {
        var dirProj = proj.filter(function (item) {
            if ((item.inDevDepartment == false) && (item.inTestDepartment == false))
                return item;
        });
        var testProj = proj.filter(function (item) {
            if ((item.inDevDepartment == true) && (item.inTestDepartment == false) && (item.readyToTest == true))
                return item;
        });
        var webProj = dirProj.filter(function (item) {
            if (item.type == Project.typeOfProject(0))
                return item;
        });
        var mobileProj = dirProj.filter(function (item) {
            if (item.type == Project.typeOfProject(1))
                return item;
        });

        function recieveProjects(proj, inDev, inTest, rdyTest) {
            var num = 0, difSum = 0;

            function giveProjectsToDevelopers(k) {
                this.projects[this.quantityOfProjects] = proj[i];
                this.projects[this.quantityOfProjects].inDevDepartment = inDev;
                this.projects[this.quantityOfProjects].inTestDepartment = inTest;
                this.projects[this.quantityOfProjects].readyToTest = rdyTest;
                this.projects[this.quantityOfProjects].dayOfStartDev = day;

                if (inTest == false) {
                    if (proj[i].type == Project.typeOfProject(0))
                        this.projects[this.quantityOfProjects].quantityOfDevelopers = 1;
                    else
                        this.projects[this.quantityOfProjects].quantityOfDevelopers = this.projects[this.quantityOfProjects].difficulty;
                }
                else {
                    this.projects[this.quantityOfProjects].difficulty == 1;
                    this.projects[this.quantityOfProjects].quantityOfDevelopers = 1;
                }
                this.quantityOfProjects++;
            }


            var Type, mode = 0;
            if (proj.length > 0) {

                switch (this.type) {
                    case Department.typeOfDepartment(0):
                        Type = 0;
                        break;
                    case Department.typeOfDepartment(1):
                        Type = 1;
                        break;
                    case Department.typeOfDepartment(2):
                        Type = 2;
                        break;
                }
                for (var j = 1; j <= 2; j++) {
                    if (mode == 0) {
                        for (var i = 0; i <= proj.length - 1; i++) {
                            if (Type == 0) {
                                proj[i].quantityOfDevelopers = 1;
                                mode = 1;
                            }
                            else if (Type == 1) {
                                if (proj.length >= this.quantityOfFreeEmployees) {
                                    proj[i].quantityOfDevelopers = 1;
                                    mode = 1;
                                }
                                else {
                                    proj.forEach(function (item) {
                                        difSum = difSum + item.difficulty;
                                    });
                                    if (difSum <= this.quantityOfFreeEmployees) {
                                        mode = 1;
                                        proj[i].quantityOfDevelopers = proj[i].difficulty;
                                        proj[i].difficulty = 1;
                                    }
                                    else {
                                        proj[i].quantityOfDevelopers = 1;
                                        mode = 2;
                                    }
                                }
                            }
                            else {
                                proj[i].quantityOfDevelopers = 1;
                                proj[i].difficulty = 1;
                                mode = 1;
                            }
                        }
                    }
                    else if (mode == 2) {
                        for (i = 0; i <= proj.length - 1; i++) {
                            if ((proj[i].difficulty - 1 < difSum) && (proj[i].difficulty != 1)) {
                                difSum = difSum - (proj[i].difficulty - 1);
                                proj[i].quantityOfDevelopers = proj[i].difficulty;
                            }
                            else {
                                if (((proj[i].difficulty == 2) && (difSum == 1)) || ((proj[1].difficulty == 3) && (difSum == 2))) {
                                    proj[i].quantityOfDevelopers = proj[i].difficulty;
                                    difSum = 0;
                                }
                                else if ((difSum == 2) && (this.quantityOfFreeEmployees == 1) && (proj[i].difficulty == 2)) {
                                    proj[i].quantityOfDevelopers = proj[1].difficulty;
                                    difSum--;
                                }

                            }
                        }
                    }
                }
            }
        }
    }

}





/*
if ((proj.length>0) && (this.employees.length>0)) {
    if ((proj[0].type==Project.typeOfProject(0)) || (proj[0].type==Project.typeOfProject(2))) {
        qod=1;
        if (proj[0].type==Project.typeOfProject(2))
            diff=1;
        else
            diff=0;
    }
    else {
        
    }
}  */




/*
    this.projects[this.quantityOfProjects] = proj[i];
    this.projects[this.quantityOfProjects].inDevDepartment = inDev;
    this.projects[this.quantityOfProjects].inTestDepartment = inTest;
    this.projects[this.quantityOfProjects].readyToTest = rdyTest;
    this.projects[this.quantityOfProjects].dayOfStartDev = day;

    this.projects[this.quantityOfProjects].difficulty == [ QA: 1 || Dev: 1 | 2 | 3 ]  if (dept=QA) diff=1
    this.projects[this.quantityOfProjects].quantityOfDevelopers = [QA: 1 || WebDev: 1 || MobDev: 1 | 2 | 3 ] if (dept=QA or dept=WebDev) diff=1 else diff=1/2/3
    this.quantityOfEmployees=[-1 | -difficulty]
    k=[0 | 1]

*/


switch (this.type) {
    case Department.typeOfDepartment(0):
        recieveProjects(webProj, true, false, false);
        break;
    case Department.typeOfDepartment(1):
        recieveProjects(mobileProj, true, false, false);
        break;
    case Department.typeOfDepartment(2):
        recieveProjects(testProj, false, true, false);
        break;
}
    }

giveProjectToDeveloper() {

}

}

class Employee {
    static typeOfEmployee(i) {
        return ['Web developer', 'Mobile developer', 'QA tester'][i];
    }
    constructor(type, proj, id) {
        this.type = Employee.typeOfEmployee(type);
        this.completedProjects = 0;
        this.busy = false;
        //   this.currentProject=proj;
        this.currentProjectID = id;
        this.notWorkingDays = 0;
    }

    getProject(proj) {

    }

    completeProject(day, proj) {
        if (this.busy == false) {
            this.notWorkingDays++;
        }
        else {
            if (this.type != Employee.typeOfEmployee(2)) {
                if (proj.difficulty == day - proj.dayOfStartDev) {
                    this.busy = false;
                    this.notWorkingDays = 0;
                    this.completedProjects++;
                    proj[this.currentProjectID].readyToTest = true;
                }
            }
            else {
                if ((proj.inTestDepartment == true) && (day == proj.dayOfStartDev))
                    this.busy = true;
                else {
                    this.busy = false;
                    this.completedProjects++;
                    // указать, что проект завершен(удалить или типа того)
                }
            }

        }

        if (this.type == Employee.typeOfEmployee(1)) {
            if (this.busy == false) {

            }

        }
    }
}

class Project {
    static typeOfProject(i) {
        return ['Web project', 'Mobile project'][i];
    }
    constructor(day) {
        this.type = Project.typeOfProject(Math.round(Math.random()));
        this.difficulty = Math.round(Math.random() * 2 + 1);
        this.quantityOfDevelopers = 0;
        this.dayOfAdding = day;
        this.dayOfStartDev;
        this.inDevDepartment = false;
        this.inTestDepartment = false;
        this.readyToTest = false;
    }
}

var dir = new Director;
dir.getEmployees(0);
dir.getProjects(0);