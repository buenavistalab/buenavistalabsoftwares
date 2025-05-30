(function() {
      const grid = document.getElementById('grid');
      const gutter = 16;
      const itemWidth = 300;
      let cols = 0;

      function layoutMasonry() {
        const gridWidth = grid.clientWidth;
        // calcula quantas colunas cabem
        cols = Math.floor((gridWidth + gutter) / (itemWidth + gutter)) || 1;
        // altura atual de cada coluna
        const colHeights = Array(cols).fill(0);

        // posiciona cada item
        Array.from(grid.children).forEach(item => {
          item.style.width = itemWidth + 'px';
          // obtém menor coluna disponível
          const minCol = colHeights.indexOf(Math.min(...colHeights));
          const x = (itemWidth + gutter) * minCol;
          const y = colHeights[minCol];
          // aplica transform para posicionar
          item.style.transform = `translate(${x}px, ${y}px)`;
          // atualiza altura da coluna
          colHeights[minCol] += item.getBoundingClientRect().height + gutter;
        });
        // ajusta altura do container para envolver todos os itens
        grid.style.height = Math.max(...colHeights) + 'px';
      }

      // executa on load
      window.addEventListener('load', layoutMasonry);
      // reordena on resize (com debounce)
      let resizeTimer;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(layoutMasonry, 200);
      });
    })();