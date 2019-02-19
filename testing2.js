class Director {
    constructor() {
        this.projects = [];
        this.quantityOfAllProjects=0;
    }

    getProjects(day) {
        var num = Math.round(Math.random() * 4);
        if (num > 0)
            for (var i = 0; i <= num - 1; i++)
                this.projects[this.projects.length] = new Project(day,++this.quantityOfAllProjects);
    }

    getEmployees(day, dept) {
        var emp, freeEmp, freeProj;
        if (day != 1) {
            if (this.projects.length > 0)
                for (var i = 0; i <= this.projects.length - 1; i++)
                    if (dept.type != 'Test') {
                        emp = new Employee(this.projects[i].type);
                        dept.getEmployees(emp);
                    }
            freeEmp = dept.getFreeEmployees().length;
            freeProj = dept.getFreeProjects().length;
            if ((dept.projects.length > 0) && (freeEmp < freeProj) && (dept.type == 'Test'))
                for (i = 0; i <= freeProj - freeEmp - 1; i++) {
                    emp = new Employee('Test');
                    dept.getEmployees(emp);
                }
        }
    }

    sentProjects(dept) {
        var k;
        if (dept.employees.length > 0) {

            var pr = this.projects.filter(function (item) {
                return item.type == dept.type;
            });
            if (pr.length <= dept.employees.length)
                k = pr.length;
            else
                k = dept.employees.length;

            for (i = 0; i <= this.projects.length - 1; i++) {
                if ((this.projects[i].type == dept.type) && (k > 0)) {
                    this.projects[i].stage = 1;
                    dept.getProject(this.projects[i]);
                    k--;
                }
            }
        }
        this.projects = this.projects.filter(function (item) {
            return item.stage == 0;
        });
    }


}

class Department {
    static typeOfDepartment(i) {
        return ['Web', 'Mobile', 'Test'][i];
    }
    constructor(type) {
        this.projects = [];
        this.employees = [];
        this.type = Department.typeOfDepartment(type);
    }
    getProject(pr) {
        this.projects[this.projects.length] = pr;
    }

    getEmployees(emp) {
        this.employees[this.employees.length] = emp;
    }

    getFreeEmployees() {
        return this.employees.filter(function (item) {
            return item.busy == false;
        });
    }

    getFreeProjects() {
        return this.projects.filter(function (item) {
            return item.inProcess == false;
        });
    }

    fireOut() { //увольнение
        var arr = [], min = 100, minID;
        for (var i = 0; i <= this.employees.length - 1; i++)
            if (this.employees[i].notWorkingDays >= 3)
                arr[arr.length] = i;
        if (arr.length != 0)
            if (arr.length == 1)
                this.employees[arr[0]] = null;
            else {
                for (i = 0; i <= arr.length - 1; i++) {
                    if (this.employees[arr[i]].completedProjects < min) {
                        min = this.employees[arr[i]].completedProjects;
                        minID = arr[i];
                    }
                }
                this.employees[minID] = null;
            }
        this.employees = this.employees.filter(function (item) {
            return item != null;
        });
    }

    giveProjectsToEmployees() {  //передача проектов в руки разработчиков
        var freeEmp, freeProj, s;
        switch (this.type) {
            case 'Web': {
                for (var i = 0; i <= this.projects.length - 1; i++)
                    if (this.projects[i].inProcess == false)
                        for (var j = 0; j <= this.employees.length - 1; j++)
                            if (this.employees[j].busy == false) {
                                this.employees[j].busy = true;
                                this.projects[i].inProcess = true;
                                this.projects[i].quantityOfDevelopers = 1;
                                this.employees[j].getProject(this.projects[i]);
                                break;
                            }
                this.projects = this.projects.filter(function (item) {
                    return item.inProcess == false;
                });
                this.employees = this.employees.filter(function (item) {
                    return item.busy == false;
                });
            }
            case 'Mobile': {
                freeEmp = getFreeEmployees().length;
                freeProj = getFreeProjects().length;
                for (i = 0; i <= this.projects.length - 1; i++)
                    if (this.projects[i].inProcess == false)
                        for (j = 0; j <= this.employees.length - 1; j++)
                            if (this.employees[j].busy == false) {
                                this.employees[j].busy = true;
                                this.projects[i].inProcess = true;
                                this.projects[i].quantityOfDevelopers = 1;
                                this.employees[j].getProject(this.projects[i]);
                                break;
                            }
                if (freeEmp > freeProj) {
                    for (i = 0; i <= this.projects.length - 1; i++) {
                        freeEmp = getFreeEmployees().length;
                        s = this.projects[i].difficulty - this.projects[i].quantityOfDevelopers;
                        if ((this.projects[i].difficulty != this.projects[i].quantityOfDevelopers) && (freeEmp >= s))
                            for (j = 0; j <= this.employees.length - 1; j++)
                                if ((this.employees[j].busy == false) && (s != 0)) {
                                    this.employees[j].busy = true;
                                    this.projects[i].quantityOfDevelopers++;
                                    this.employees[j].getProject(this.projects[i]);
                                    //this.employees[j].project.quantityOfDevelopers=this.projects[i].difficulty;
                                    s--;
                                }
                    }

                    for (i=0;i<=this.projects.length-1;i++)
                        for (j=0;j<=this.employees.length-1;j++)
                            if (this.projects[i].ID==this.employees[j].project.ID) 
                                this.employees[j].project.quantityOfDevelopers=this.projects[i].quantityOfDevelopers;
                            
                }
            }
            case 'Test': {
                for (i = 0; i <= this.projects.length - 1; i++)
                    for (j = 0; j <= this.employees.length - 1; j++)
                        if (this.employees[j].busy == false) {
                            this.employees[j].busy = true;
                            this.projects[i].quantityOfDevelopers = 1;
                            this.employees[j].getProject(this.projects[i]);
                            break;
                        }
            }
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
        this.project;
        this.busy = false;
        this.notWorkingDays = 0;
    }

    getEmployment() {
        if (this.busy == false)
            this.notWorkingDays++;
        else
            this.notWorkingDays = 0;
        return this.notWorkingDays;
    }

    getProject(proj) {
        this.project = proj;
    }

    completeProject(day, testDept) {
        switch (this.type) {
            case 'Web': {
                if (this.project.dayOfStartDev == 0)
                    this.project.dayOfStartDev = day;
                else if (day - this.project.dayOfStartDev == this.project.difficulty) {
                    this.project.stage = 2;
                    this.project.dayOfStartDev = day;
                    this.project.inProcess = false;
                    testDept.getProject(this.project);
                    this.project = null;
                    this.busy = false;
                    this.notWorkingDays = 0;
                }

            }
            case 'Mobile': {
                if (this.project.dayOfStartDev == 0)
                    this.project.dayOfStartDev = day;
                else
                    if (this.project.quantityOfDevelopers == this.project.difficulty) {
                        if (day - this.project.dayOfStartDev == 1) {
                            this.project = null;
                            this.busy = false;
                            this.notWorkingDays = 0;
                        }
                    }
                    else
                        if (day - this.project.dayOfStartDev == this.project.difficulty) {
                            this.project = null;
                            this.busy = false;
                            this.notWorkingDays = 0;
                        }
            }
            case 'Test': {
                if (day - this.project.dayOfStartDev == 1) {
                    this.project = null;
                    this.busy = false;
                    this.notWorkingDays = 0;
                }
            }
        }
    }
}

class Project {
    static typeOfProject(i) {
        return ['Web', 'Mobile'][i];
    }
    constructor(day,id) {
        this.type = Project.typeOfProject(Math.round(Math.random()));
        this.difficulty = Math.round(Math.random() * 2 + 1);
        this.ID=id;
        this.quantityOfDevelopers = 0;
        this.dayOfAdding = day;
        this.dayOfStartDev = 0;
        this.stage = 0;  //0 - проект у директора, 1 - проект разрабатывается(веб или мобильный отдел), 2 - проект в отделе тестирования
        this.inProcess = false;
    }

}