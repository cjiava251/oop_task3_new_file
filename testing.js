class Director {
    constructor() {
        this.projects = [];
        //this.employees = [];
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
        var c,emp;
        if (day != 1) {
            for (var i = 0; i <= this.quantityOfProjects - 1; i++) {
                if ((this.projects[i].dayOfAdding < day) && (this.projects[i].inDevDepartment == false) && (this.projects[i].inTestDepartment == false)) {
                    //if (this.projects[i].type == Project.typeOfProject(0))
                    if ((this.projects[i].type==dept.type) || ((dept.type==Department.typeOfDepartment(2) &&  ()) )
                        c = 0;
                    else
                        c = 1;
                }
                else if ((this.projects[i].inDevDepartment == true) && (this.projects[i].readyToTest == true)) {
                    c = 2;
                }
                else continue;
                emp=new Employee(Employee.typeOfEmployee(c));
                dept.getEmployees(emp);
            }
        }
    }

    sentProjectsToDepartment(dept, day) {
        this.projects=dept.getProjects(this.projects, day);

    }
}

class Department {
    static typeOfDepartment(i) {
        return ['Web', 'Mobile', 'Test'][i];
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
        //this.employees[this.quantityOfEmployees].busy = true;
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

            function giveProjectsToDevelopers() {
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
                var qofe = this.quantityOfFreeEmployees;
                for (var j = 1; j <= 2; j++) {
                    if (mode == 0) {
                        for (var i = 0; i <= proj.length - 1; i++) {
                            if (Type == 0) {
                                proj[i].quantityOfDevelopers = 1;
                                qofe--;
                                mode = 1;
                            }
                            else if (Type == 1) {
                                if (proj.length >= this.quantityOfFreeEmployees) {
                                    proj[i].quantityOfDevelopers = 1;
                                    qofe--;
                                    mode = 1;
                                }
                                else {
                                    proj.forEach(function (item) {
                                        difSum = difSum + item.difficulty;
                                    });
                                    if (difSum <= this.quantityOfFreeEmployees) {
                                        mode = 1;
                                        proj[i].quantityOfDevelopers = proj[i].difficulty;
                                        qofe -= proj[i].difficulty;
                                        proj[i].difficulty = 1;
                                    }
                                    else {
                                        proj[i].quantityOfDevelopers = 1;
                                        qofe--;
                                        mode = 2;
                                    }
                                }
                            }
                            else {
                                proj[i].quantityOfDevelopers = 1;
                                qofe--;
                                proj[i].difficulty = 1;
                                mode = 1;
                            }
                        }
                    }
                    else if (mode == 2) {
                        for (i = 0; i <= proj.length - 1; i++) {
                            if ((qofe > 2) || ((qofe == proj[i].difficulty - 1) && (qofe != 0))) {
                                proj[i].quantityOfDevelopers = proj[i].difficulty;
                                qofe -= proj[i].difficulty - 1;
                                difSum -= proj[i].difficulty - 1;
                            }
                        }
                    }
                }
            }
        }
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
}

class Employee {
    static typeOfEmployee(i) {
        return ['Web', 'Mobile', 'Test'][i];
    }
    constructor(type) {
        this.type = Employee.typeOfEmployee(type);
        this.completedProjects = 0;
        this.busy = false;
        //this.currentProject=proj;
        //this.currentProjectID = id;
        this.notWorkingDays = 0;
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
        return ['Web', 'Mobile'][i];
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
        this.flag=0;
    }
}

var dir = new Director;
dir.getEmployees(0);
dir.getProjects(0);