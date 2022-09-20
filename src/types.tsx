export interface Group {
    id:          string;
    name:        string;
    description: string;
    type:        boolean;
    roles:       Person[];
    people:      Person[];
    members:     number;
  }
  
  export interface Person {
    id:     string;
    name:   string;
    active: boolean;
  }