class Director {
    constructor() {
        this.projects = [];
    }

    getProjects(day) {
        var num = Math.round(Math.random() * 4);
        if (num > 0)
            for (var i = 0; i <= num - 1; i++)
                this.projects[this.projects.length] = new Project(day);
    }

    getEmployees(day, dept) {
        var emp;
        if (day != 1) {
            if (this.projects.length > 0)
                for (var i = 0; i <= this.projects.length - 1; i++)
                    if (dept.type != Department.typeOfDepartment(2)) {
                        emp = new Employee(this.projects[i].type);
                        dept.getEmployees(emp);
                    }
            if ((dept.projects.length > 0) && (dept.employees.length < dept.projects.length) && (dept.type = Department.typeOfDepartment(2)))
                for (i = 0; i <= test.projects.length - test.employees.length - 1; i++) {
                    emp = new Employee(Employee.typeOfEmployee(2));
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
                    dept.getProject(this.projects[i]);
                    this.projects[i].flag = 1;
                    k--;
                }
            }
        }
        this.projects = this.projects.filter(function (item) {
            return item.flag == 0;
        });
    }


}

class Department {
    constructor() {
        this.projects = [];
        this.employees = [];
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

    getNoBusyProjects() {
        return this.projects.filter(function (item) {
            return item.inProcess == false;
        });
    }

    proc() {
        var freeEmp = getFreeEmployees(), freeProj = getNoBusyProjects();

        if ((freeEmp.length >= freeProj.length) && (this.type = 'Mobile')) {
            var sum = 0;
            for (i = 0; i <= freeProj.length - 1; i++) {
                sum += freeProj.difficulty;
            }
            if (sum <= freeEmp.length) {
                for (i = 0; i <= this.projects.length - 1; i++)
                    if (this.projects[i].inProcess == false)
                        for (j = 0; j <= this.employees.length - 1; i++)
                            if ((this.employees[j].busy == false) && (this.projects[i].quantityOfDevelopers != this.projects[i].difficulty)) {
                                this.projects[i].inProcess = true;
                                this.employees[j].busy = true;
                                this.projects[i].quantityOfDevelopers++;
                            }
            }
            else {
                for (i = 0; i <= this.projects[i].length - 1; i++) {
                    if (this.projects[i].inProcess == false) {
                        for (j = 0; j <= this.employees.length - 1; j++) {
                            if (this.employees[j].busy == false) {
                                this.projects[i].inProcess = true;
                                this.employees[j].busy = true;
                                this.projects[i].quantityOfDevelopers = 1;
                            }
                        }
                    }
                }
                freeEmp = getFreeEmployees();
                var s = freeEmp.length;
                for (i = 0; i <= this.projects[i].length - 1; i++) {
                    if ((this.projects[i].inProcess == true) && (this.projects[i].difficulty != this.projects[i].quantityOfDevelopers) && (s >= this.projects[i].difficulty - this.projects[i].quantityOfDevelopers)) {
                        for (j = 0; j <= this.employees.length - 1; j++) {
                            if ((this.employees[j].busy == false) && (this.projects[i].quantityOfDevelopers != this.projects[i].difficulty)) {
                                this.projects[i].quantityOfDevelopers++;
                                this.employees[j].busy = true;
                                s--;
                            }
                        }
                    }
                }
            }
        }
        else if ((freeEmp.length < freeProj.length) && (this.type = 'Mobile')) {
            for (i = 0; i <= this.projects.length - 1; i++) {
                if (this.projects[i].inProcess == false) {
                    for (j = 0; j <= this.employees.length - 1; j++) {
                        if (this.employees[j].busy == false) {
                            this.projects[i].inProcess = true;
                            this.employees[j].busy = true;
                        }
                    }
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
        this.busy = false;
        this.notWorkingDays = 0;
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
        this.flag = 0;
        this.inProcess = false;
    }

}