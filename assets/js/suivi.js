
'use strict';

$(function () {
  var dt_scrollable_table = $('.dt-scrollableTable');

  if (dt_scrollable_table.length) {
    var dt_scrollableTable = dt_scrollable_table.DataTable({
      ajax: assetsPath + 'json/suivi.json',
      columns: [
        { data: 'remboursement' },
        { data: 'prix' },
        { data: 'montant' },
        { data: 'date' },
        { data: 'adress' },
        { data: 'soin' }
      ],
      columnDefs: [
        {
            // date
            targets: 3,
            render: function (data, type, full, meta) {
              var date = new Date(full.date); // convert the date string to a Date object
              
              var formattedDate = date.toLocaleDateString('fr-FR', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                time: 'numeric'
              });
              var displayDate = '<span class="text-nowrap">' + formattedDate +'</span>';
              var displayResult = '<div class="d-flex flex-column"><span class="emp_name text-truncate">'+displayDate+' - '+full['name']+' '+full['last_name']+'</span><small class="emp_post text-truncate text-muted">'+full['email']+'</small></div>'
              return '<span class="text-nowrap">' + displayResult +'</span>';
            }
          },
      ],
      "language": {
        "sProcessing": "Traitement en cours...",
        "sSearch": "Rechercher&nbsp;:",
        "sLengthMenu": "Afficher _MENU_ &eacute;l&eacute;ments",
        "sInfo": "Affichage de l'&eacute;lement _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
        "sInfoEmpty": "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
        "sInfoFiltered": "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
        "sInfoPostFix": "",
        "sLoadingRecords": "Chargement en cours...",
        "sZeroRecords": "Aucun &eacute;l&eacute;ment &agrave; afficher",
        "sEmptyTable": "Aucune donnée disponible dans le tableau",
        "oPaginate": {
            "sFirst": "Premier",
            "sPrevious": "Pr&eacute;c&eacute;dent",
            "sNext": "Suivant",
            "sLast": "Dernier"
        },
        "oAria": {
            "sSortAscending": ": activer pour trier la colonne par ordre croissant",
            "sSortDescending": ": activer pour trier la colonne par ordre décroissant"
        },
        "select": {
            "rows": {
                "_": "%d lignes sélectionnées",
                "0": "Aucune ligne sélectionnée",
                "1": "1 ligne sélectionnée"
            }
        }
    },
      // Scroll options
      scrollY: '300px',
      scrollX: true,
      dom: '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-end"f>>t<"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>'
    });
  }
})