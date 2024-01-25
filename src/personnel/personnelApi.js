

export const GetAllPersonnels = async ({customApi}) => {
  
    const response =  await customApi.get("/Personnels?results=1000")
    return response.data
  }