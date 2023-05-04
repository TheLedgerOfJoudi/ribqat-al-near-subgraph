
const fetchData = async () => {
    fetch('https://api.thegraph.com/subgraphs/name/theledgerofjoudi/ribqat-al-near', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
        query GetStorage {
                         storages {
                           id
                           initialStorage
                           currentStorage
                           attachedDeposit
                         }
                       }
      `,
        }),
    })
        .then((res) => res.json())
        .then((result) => {
            var table = document.createElement("table")
            table.innerHTML = "<tr><td>initial storage</td><td>current storage</td><td>attached deposit</td></tr>";
            for (i = 0; i < result.data.storages.length; i++) {
                var row = table.insertRow()
                var c0 = row.insertCell()
                var text = document.createTextNode(result.data.storages[i].initialStorage);
                c0.appendChild(text);
                var c1 = row.insertCell()
                text = document.createTextNode(result.data.storages[i].currentStorage);
                c1.appendChild(text)
                var c2 = row.insertCell()
                text = document.createTextNode(result.data.storages[i].attachedDeposit);
                c2.appendChild(text)
            }
            document.getElementById("table").appendChild(table);
        }
        );
};

fetchData()