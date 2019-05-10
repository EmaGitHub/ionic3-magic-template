
export class User {
    public id: string;
    public username: string;
    public firstName?: string;
    public lastName?: string;
    public timestamp: number;

    constructor (
        user: Partial<User>
    ) {
        this.id = (user.id)? user.id : '';
        this.username = (user.username)? user.username : '';
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.timestamp = user.timestamp || new Date().getTime();
    }

    public isLogged(): boolean {
        return this.id !== undefined;
    }

    public getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}
