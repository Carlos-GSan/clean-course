(() =>{

    // Aplicando el principio de responsabilidad única
    // Priorizar la composición frente a la herencia

    type Gender = 'M'|'F';

    interface PersonProps {
        birthdate   : Date;
        gender      : Gender; 
        name        : string; 
        
    }
    class Person {
        public birthdate: Date;
        public gender   : Gender;
        public name     : string;
        
        constructor({ name, gender, birthdate }: PersonProps ){
            this.name       = name;
            this.gender     = gender;
            this.birthdate  = birthdate;
        }
    }

    interface UserProps {
        email       : string;
        role        : string;
    }

    class User {
        public email: string;
        public lastAccess: Date;
        public role: string;

        constructor({
            email, 
            role, 
        }: UserProps){
            this.lastAccess = new Date();
            this.email = email;
            this.role = role;
        }

        checkCredentials(){
            return true;
        }
    }

    interface SettingsProps {
        lastOpenFolder    : string;
        workingDirectory  : string;
    }
    class Settings {
        public workingDirectory: string;
        public lasOpenFolder: string;
        constructor({                  
            lastOpenFolder,   
            workingDirectory, 
        }: SettingsProps){
            this.workingDirectory = workingDirectory;
            this.lasOpenFolder = lastOpenFolder;
        }
    }

    // Ahora necesito crearme una clase que me permita relacionar todas las demás 
    interface UserSettingsProps {
        birthdate         : Date;
        email             : string;
        gender            : Gender;
        lastOpenFolder    : string;
        name              : string;
        role              : string;
        workingDirectory  : string;
    }

    class UserSettings {
        // Clase que va a ser una composición de mis otras clases
        // Priorizar la composición en lugar de la herencia
        public person   :  Person;
        public user     :  User;
        public settings :  Settings;

        constructor({
            name, gender, birthdate,
            email, role,
            lastOpenFolder, workingDirectory
        }: UserSettingsProps ){
            this.person = new Person({ name, gender, birthdate });
            this.user = new User({ email, role });
            this.settings = new Settings({ lastOpenFolder, workingDirectory});
        }

    }

    const userSettings = new UserSettings({
        birthdate:new Date(1994,2,12),
        email: 'carlos@google.com',
        gender: 'M',
        lastOpenFolder: '/home',
        name: 'Carlos',
        role: 'Admin',
        workingDirectory: '/usr/home',
});
    console.log({ userSettings });

    console.log(userSettings.user.checkCredentials());

})();