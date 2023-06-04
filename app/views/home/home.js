const Home = {
    render: ()=> {
       const contentDiv = $("#content");
       var html = `
       <h1>Informações do Banco</h1>

       <h2>Saldo</h2>
       <p id="saldo"></p>
     
       <h2>Informações do Cliente</h2>
       <p id="nome"></p>
     
       <h2>Últimas Compras</h2>
       <table>
         <thead>
           <tr>
             <th>Data</th>
             <th>Descrição</th>
             <th>Valor</th>
           </tr>
         </thead>
         <tbody id="ultimasCompras">
         </tbody>
       </table>
        `;

        // $.getScript("controllers/homeController.js", function() {
        //     HomeController.init();
        // });
       
       contentDiv.html(html)
    }
}


