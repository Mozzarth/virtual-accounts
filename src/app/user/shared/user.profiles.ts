enum Profiles {
    ROOT, // Root
    ADMIN, // Administradors
    DISTRIBUTOR, // Distribuidores 
    BUYER // Compradores
}

export const Profiles2 = {
    ROOT: {
        codigo: 1,
        nombre: "Root"
    },
    ADMIN: {
        codigo: 2,
        nombre: "Administrador"
    },
    DISTRIBUTOR: {
        codigo: 3,
        nombre: "Distribuidor"
    },
    BUYER: {
        codigo: 4,
        nombre: "Comprador"
    }
}


export function ProfilesValues() : number[]{   
    return Object.keys(Profiles2).map((key: string) => (Profiles2 as any)[key].codigo)
}
export function ProfilesValid(profile: number) {
    const arrvalues = ProfilesValues()
    const result = arrvalues.findIndex(p => profile == p) != -1
    return result
}