import { error } from 'console'
import mysql, { Connection } from 'mysql2/promise'

class BancoMysql{
    //atributos de uma classe
    conection:Connection|null = null

    //métodos
    async criarConexao(){
        //conecta o banco
        this.conection = await mysql.createConnection({
            host:process.env.dbhost?process.env.dbhost:"localhost",
            user:process.env.dbuser?process.env.dbuser:"root",
            password:process.env.dbpassword?process.env.dbpassword:"",
            database:process.env.dbname?process.env.dbname:"banco1022a",
            port:process.env.dbport?parseInt(process.env.dbport):3306
                })
    }
    async consultar(query:string,params?:any[any]){
        if(!this.conection) throw new Error("Erro de conexão com o banco de dados.")
        //Consulta (query)
        const [result, fields] = await this.conection.query(query,params)
        return result
    }
    async finalizarConexao(){
        if(!this.conection) throw new Error("Erro de conexão com o banco de dados.")
        //Finaliza a conexão
       await this.conection.end()
    }
}
export default BancoMysql