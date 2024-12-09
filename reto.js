const fs = require("fs");

fs.readFile("network.txt", "utf-8", (err, data) => {
  if (err) {
    console.log("Error reading file");
    return;
  }

  try {
    const connections = JSON.parse(data);
    const nodes = new Set();
    connections.forEach(([a, b]) => {
      nodes.add(a);
      nodes.add(b);
    });

    const networks = [];
    connections.forEach(([a, b]) => {
      const matchingNetworks = networks.filter(
        (network) => network.has(a) || network.has(b)
      );

      if (matchingNetworks.length > 0) {
        const mergedNetwork = new Set();
        matchingNetworks.forEach((network) => {
          network.forEach((node) => mergedNetwork.add(node));
          networks.splice(networks.indexOf(network), 1);
        });
        mergedNetwork.add(a);
        mergedNetwork.add(b);
        networks.push(mergedNetwork);
      } else {
        networks.push(new Set([a, b]));
      }
    });

    const destroyedNetworks = networks.filter((network) => network.size >= 1);
    const destroyedNodes = new Set(
      destroyedNetworks.flatMap((network) => Array.from(network))
    );
    const savedNodes = Array.from(nodes).filter(
      (node) => !destroyedNodes.has(node)
    );
    console.log("submit", savedNodes.sort((a, b) => a - b).join(","));
  } catch (parseError) {
    console.log("Error parsing file", parseError.message);
  }
});
