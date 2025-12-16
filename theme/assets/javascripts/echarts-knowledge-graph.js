// Normalize target paths so ./example.md → blog/posts/example.md
function normalizeLink(link, nodes) {
  let target = link.target;

  if (target.startsWith("./")) {
    target = target.replace("./", "blog/posts/");
  }

  // If target still not found, try removing extension logic etc.
  const exists = nodes.some(n => n.id === target);
  if (!exists) {
    console.warn("Link target not found, skipping:", link.target, "→", target);
    return null;
  }

  return {
    source: link.source,
    target: target
  };
}

fetch("/assets/graph.json")
  .then(r => r.json())
  .then(data => {
    const dom = document.getElementById("graph");
    const chart = echarts.init(dom);

    // Convert nodes for ECharts
    const nodes = data.nodes.map(n => ({
      id: n.id,
      name: n.title,
    //   name: n.id.replace("blog/posts/", "").replace(".md", ""),
      value: n.id,
      url: n.url,
      symbolSize: 30
    }));

    // Normalize links
    const links = data.links
      .map(l => normalizeLink(l, data.nodes))
      .filter(l => l !== null);

    const option = {
      tooltip: {
        formatter: params => params.data.value || params.data.id
      },
      series: [
        {
          type: "graph",
          layout: "force",
          roam: true,       // zoom + drag
          draggable: true,
          emphasis: {
            focus: "adjacency"
          },
          data: nodes,
          links: links,
          force: {
            repulsion: 200,
            edgeLength: 120
          },
          label: {
            show: true,
            position: "right"
          },
          lineStyle: {
            color: "#aaa"
          }
        }
      ]
    };

    chart.on("click", function (params) {
        if (params.dataType === "node") {
            // Convert md file path -> mkdocs URL
            const url = "/" + params.data.url;

            // console.log("Navigate to:", params);
            window.location.href = url;
        }
    });

    chart.setOption(option);
  })
  .catch(err => console.error("Graph load error:", err));
