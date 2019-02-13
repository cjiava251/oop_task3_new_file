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
                this.employees[this.quantityOfEmployees] = new Employee(Employee.typeOfEmployee(c),this.projects,i);
                dept.getEmployees(this.employees[this.quantityOfEmployees]);
                this.quantityOfEmployees++;
            }
        }
    }

    sentProjectsToDepartment(dept,day) {
        dept.getProjects(this.projects,day);
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

    getEmployees(emp) {
        this.employees[this.quantityOfEmployees] = emp;
        this.employees[this.quantityOfEmployees].busy = true;
        this.quantityOfEmployees++;
    }

    getProjects(proj,day) {
        var num;
        var dirProj = proj.filter(function (item) {
            if ((item.inDevDepartment == false) && (item.inTestDepartment == false))
                return item;
        });
        var deptProj = proj.filter(function (item) {
            if ((item.inDevDepartment == true) && (item.inTestDepartment == false) && (item.readyToTest == true))
                return item;
        });
        if (this.type == Department.typeOfDepartment(2)) {
            if (this.quantityOfFreeEmployees != 0) {
                if (this.quantityOfFreeEmployees > deptProj.length)
                    num = deptProj.length;
                else
                    num = this.quantityOfFreeEmployees;
                for (var i = 0; i <= num - 1; i++) {
                    this.projects[this.quantityOfProjects] = deptProj[i];
                    this.projects[this.quantityOfProjects].inDevDepartment = false;
                    this.projects[this.quantityOfProjects].inTestDepartment = true;
                    this.projects[this.quantityOfProjects].readyToTest = false;
                    this.projects[this.quantityOfProjects].dayOfStartDev=day;
                    this.quantityOfProjects++;
                }
            }
        }
        else {
            if (this.quantityOfFreeEmployees != 0) {
                if (this.quantityOfFreeEmployees > dirProj.length)
                    num = dirProj.length;
                else
                    num = this.quantityOfFreeEmployees;
                for (i = 0; i <= num - 1; i++) {
                    this.projects[this.quantityOfProjects] = dirProj[i];
                    this.projects[this.quantityOfProjects].inDevDepartment = true;
                    this.projects[this.quantityOfProjects].inTestDepartment = false;
                    this.projects[this.quantityOfProjects].readyToTest = false;
                    this.projects[this.quantityOfProjects].dayOfStartDev=day;
                    this.quantityOfProjects++;
                }
            }
        }
    }

}

class Employee {
    static typeOfEmployee(i) {
        return ['Web developer', 'Mobile developer', 'QA tester'][i];
    }
    constructor(type,proj,id) {
        this.type = Employee.typeOfEmployee(type);
        this.completedProjects = 0;
        this.busy = false;
     //   this.currentProject=proj;
        this.currentProjectID=id;
        this.notWorkingDays=0;
    }
    
    getProject(proj) {

    }

    completeProject(day,proj) {
        if (this.busy==false) {
            this.notWorkingDays++;
        }
        else {
            if (this.type!=Employee.typeOfEmployee(2)) {
                if (proj.difficulty==day-proj.dayOfStartDev) {
                    this.busy=false;
                    this.notWorkingDays=0;
                    this.completedProjects++;
                    proj[this.currentProjectID].readyToTest=true;
                }
            }
            else {
                if ((proj.inTestDepartment==true) && (day==proj.dayOfStartDev)) 
                    this.busy=true;
                else {
                    this.busy=false;
                    this.completedProjects++;
                    // указать, что проект завершен(удалить или типа того)
                }
            }

        }

        if (this.type==Employee.typeOfEmployee(1)) {
            if (this.busy==false) {

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