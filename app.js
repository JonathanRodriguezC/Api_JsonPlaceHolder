import axios from 'axios';
import express from 'express'

const app = express();
const port = 4000;

const url = 'https://jsonplaceholder.typicode.com/todos'

app.use(express.json());

// GET donde pueda devolver todos los datos 

app.get('/app/todos', async (req, res) => {
    try {
        const response = await axios.get(`${url}`)
        console.log(response.data);
        res.json(response.data)
    } catch {
        console.log(`Error al obtener los datos`)
    }

})

// GET donde se puede consultar por id especifico y mapear que solo se 
// muestre el title.
app.get('/app/id/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.get(`${url}/${id}`)
        console.log({ title: response.data.title });
        res.json({ title: response.data.title })
    } catch {
        console.log(`Error al obtener los datos`)
        res.status(500).json({ message: 'Error al obtener los datos' })
    }
})

// GET donde se pueda consultar por el title y devuelva todos los campos. 

// ejemplo para peticion get http://localhost:4000/app/title/quis%20ut%20nam%20facilis%20et%20officia%20qui

app.get('/app/title/:title', async (req, res) => {
    const { title } = req.params;
    try {
        const response = await axios.get(`${url}`)
        const Respuestas = response.data;
        const filterTitle = Respuestas.filter(Respuesta => Respuesta.title === title)
        if (filterTitle.length > 0) {
            console.log({ titleSeleccionado: filterTitle })
            res.json({ titleSeleccionado: filterTitle })
        } else {
            console.log(`no se encontro el titulo`)
            res.status(500).json({ message: 'no se encontro el titulo' })
        }



    } catch {
        console.log(`Error al encontrar el titulo`)
        res.status(500).json({ message: 'Error al encontrar el titulo' })
    }
})


// GET donde se pueda mostrar solamente 5 documentos. 
// en este caso le podemos pasar el limite de documentos que querramos 
app.get('/app/limit/:limit', async (req, res) => {
    const { limit } = req.params;
    try {
        const response = await axios.get(`${url}`)
        const Respuestas = response.data.slice(0, limit);


        console.log(Respuestas)
        res.json(Respuestas)


    } catch {
        console.log(`Error al encontrar los datos`)
        res.status(500).json({ message: 'Error al encontrar los datos' })
    }
})




app.listen(port, () => {
    console.log(`Server iniciando en http://localhost:${port}`)
})



