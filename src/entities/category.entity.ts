type CategoryProps = {
    title: string
    color: string
    id?: string
}

export class Category {
    public id?: string
    public title: string
    public color: string



    constructor( {id, color, title}: CategoryProps) {
        this.id = id
        this.title= title
        this.color = color.toUpperCase()
    }
}



