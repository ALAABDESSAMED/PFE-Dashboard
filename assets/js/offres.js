
'use strict';

// Datatable (jquery)
$(function () {
  let borderColor, bodyBg, headingColor;

  if (isDarkStyle) {
    borderColor = config.colors_dark.borderColor;
    bodyBg = config.colors_dark.bodyBg;
    headingColor = config.colors_dark.headingColor;
  } else {
    borderColor = config.colors.borderColor;
    bodyBg = config.colors.bodyBg;
    headingColor = config.colors.headingColor;
  }

  // Variable declaration for table
  var dt_product_table = $('.datatables-products'),
    productAdd = 'add.html',
    statusObj = {
      1: { title: 'Programmée', class: 'bg-label-warning' },
      2: { title: 'Publier', class: 'bg-label-success' },
      3: { title: 'Inactif', class: 'bg-label-danger' }
    },
    categoryObj = {
      0: { title: 'Ménage' },
      1: { title: 'Bureau' },
      2: { title: 'Électronique' },
      3: { title: 'Chaussures' },
      4: { title: 'Accessoires' },
      5: { title: 'Jeux' }
    }
    
   

  // E-commerce Products datatable

  if (dt_product_table.length) {
    var dt_products = dt_product_table.DataTable({
      ajax: assetsPath + 'json/offres.json', // JSON file to add data
      columns: [
        // columns according to JSON
        { data: '' },
        { data: '' },
        { data: 'id' },
        { data: 'offre_name' },
        { data: 'voice' },
        { data: 'data' },
        { data: 'sms' },
        { data: 'prix' },
        { data: 'description' },
        { data: 'categories_client'},
        { data: '' }
      ],
      columnDefs: [
        {
          className: 'control',
          orderable: false,
          targets: 0,
          render: function (data, type, full, meta) {
            return '';
          }
        },
        {
          // For Checkboxes
          targets: 1,
          orderable: false,
          render: function () {
            return '<input type="checkbox" class="dt-checkboxes form-check-input">';
          },
          checkboxes: {
            selectAllRender: '<input type="checkbox" class="form-check-input">'
          },
          responsivePriority: 4
        },
        
        {
          // Actions
          targets: -1,
          title: 'Actions',
          searchable: false,
          orderable: false,
          render: function (data, type, full, meta) {
            var $ref = full['id'];
            return (
              '<div class="d-inline-block text-nowrap">' +
  '<a href="./edit.html?id='+$ref+'" class="btn btn-sm btn-icon"><i class="ti ti-edit"></i></a href="./edit?id='+full['id']+'">' +
  '<button class="btn btn-sm btn-icon delete-record"><i class="ti ti-trash"></i></button>' +
  '<a href="./view-product.html?ref=' + $ref + '" class="btn btn-sm btn-icon"><i class="ti ti-eye"></i></a>' +
  '</div>'
            );
          }
        }
      ],
      order: [2, 'asc'], //set any columns order asc/desc
      dom:
        '<"card-header d-flex border-top rounded-0 flex-wrap py-2"' +
        '<"me-5 ms-n2 pe-5"f>' +
        '<"d-flex justify-content-start justify-content-md-end align-items-baseline"<"dt-action-buttons d-flex flex-column align-items-start align-items-md-center justify-content-sm-center mb-3 mb-md-0 pt-0 gap-4 gap-sm-0 flex-sm-row"lB>>' +
        '>t' +
        '<"row mx-2"' +
        '<"col-sm-12 col-md-6"i>' +
        '<"col-sm-12 col-md-6"p>' +
        '>',
      lengthMenu: [7, 10, 20, 50, 70, 100], //for length of menu
      language: {
        sEmptyTable:     "Aucune donnée disponible dans le tableau",
        sInfo:           "Affichage de l'élément _START_ à _END_ sur _TOTAL_ éléments",
        sInfoEmpty:      "Affichage de l'élément 0 à 0 sur 0 élément",
        sInfoFiltered:   "(filtré à partir de _MAX_ éléments au total)",
        sInfoPostFix:    "",
        sInfoThousands:  ",",
        sLengthMenu:     "Afficher _MENU_ éléments",
        sLoadingRecords: "Chargement...",
        sProcessing:     "Traitement...",
        sSearch:         "",
        sZeroRecords:    "Aucun résultat trouvé",
        oPaginate: {
            sFirst:    "Premier",
            sLast:     "Dernier",
            sNext:     "Suivant",
            sPrevious: "Précédent"
        },
        oAria: {
            sSortAscending:  ": activer pour trier la colonne par ordre croissant",
            sSortDescending: ": activer pour trier la colonne par ordre décroissant"
        },
        searchPlaceholder: "Chercher.."
    },
      // Buttons with Dropdown
      buttons: [
        {
          extend: 'collection',
          className: 'btn btn-label-secondary dropdown-toggle me-3',
          text: '<i class="ti ti-download me-1 ti-xs"></i>Exporter',
          buttons: [
            {
              extend: 'print',
              text: '<i class="ti ti-printer me-2" ></i>Print',
              className: 'dropdown-item',
              exportOptions: {
                columns: [1, 2, 3, 4, 5, 6, 7,8,9],
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = '';
                    $.each(el, function (index, item) {
                      if (item.classList !== undefined && item.classList.contains('product-name')) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  }
                }
              },
              customize: function (win) {
                // Customize print view for dark
                $(win.document.body)
                  .css('color', headingColor)
                  .css('border-color', borderColor)
                  .css('background-color', bodyBg);
                $(win.document.body)
                  .find('table')
                  .addClass('compact')
                  .css('color', 'inherit')
                  .css('border-color', 'inherit')
                  .css('background-color', 'inherit');
              }
            },
            {
              extend: 'csv',
              text: '<i class="ti ti-file me-2" ></i>CSV',
              className: 'dropdown-item',
              exportOptions: {
                columns: [1, 2, 3, 4, 5, 6, 7,8,9],
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = '';
                    $.each(el, function (index, item) {
                      if (item.classList !== undefined && item.classList.contains('product-name')) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  }
                }
              }
            },
            {
              extend: 'excel',
              text: '<i class="ti ti-file-export me-2"></i>Excel',
              className: 'dropdown-item',
              exportOptions: {
                columns: [1, 2, 3, 4, 5, 6, 7,8,9],
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = '';
                    $.each(el, function (index, item) {
                      if (item.classList !== undefined && item.classList.contains('product-name')) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  }
                }
              }
            },
            {
              extend: 'pdf',
              text: '<i class="ti ti-file-text me-2"></i>PDF',
              className: 'dropdown-item',
              exportOptions: {
                columns: [1, 2, 3, 4, 5, 6, 7,8,9],
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = '';
                    $.each(el, function (index, item) {
                      if (item.classList !== undefined && item.classList.contains('product-name')) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  }
                }
              }
            },
            {
              extend: 'copy',
              text: '<i class="ti ti-copy me-2"></i>Copier',
              className: 'dropdown-item',
              exportOptions: {
                columns: [1, 2, 3, 4, 5, 6, 7,8,9],
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = '';
                    $.each(el, function (index, item) {
                      if (item.classList !== undefined && item.classList.contains('product-name')) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  }
                }
              }
            }
          ]
        },
        {
          text: '<i class="ti ti-plus me-0 me-sm-1 ti-xs"></i><span class="d-none d-sm-inline-block">Ajouter Offre</span>',
          className: 'add-new btn btn-primary ms-2 ms-sm-0',
          action: function () {
            window.location.href = productAdd;
          }
        }
      ],
      // For responsive popup
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              var data = row.data();
              return 'Details of ' + data['product_name'];
            }
          }),
          type: 'column',
          renderer: function (api, rowIdx, columns) {
            var data = $.map(columns, function (col, i) {
              return col.title !== '' // ? Do not show row in modal popup if title is blank (for check box)
                ? '<tr data-dt-row="' +
                    col.rowIndex +
                    '" data-dt-column="' +
                    col.columnIndex +
                    '">' +
                    '<td>' +
                    col.title +
                    ':' +
                    '</td> ' +
                    '<td>' +
                    col.data +
                    '</td>' +
                    '</tr>'
                : '';
            }).join('');

            return data ? $('<table class="table"/><tbody />').append(data) : false;
          }
        }
      },
     
    });
    $('.dataTables_length').addClass('mt-2 mt-sm-0 mt-md-3 me-2');
    $('.dt-buttons').addClass('d-flex flex-wrap');
  }
  $('body').on('click', '.viewProductImages', function() {
    const images = $(this).attr('data-images').split(',');
    const modalCarousel = $('#viewPicturesModal').find('.carousel-inner');
    const modalIndicators = $('#viewPicturesModal').find('.carousel-indicators');

    // Clear existing carousel content
    modalCarousel.empty();
    modalIndicators.empty();

    // Populate the carousel with images
    images.forEach((image, index) => {
        const isActive = index === 0 ? 'active' : '';
        modalIndicators.append(`<button type="button" data-bs-target="#modalCarouselControls" data-bs-slide-to="${index}" class="${isActive}"></button>`);
        console.log(image);
        modalCarousel.append(`
            <div class="carousel-item ${isActive}">
                <div class="onboarding-media">
                    <div class="mx-2">
                    
                        <img src="${assetsPath}/img/ecommerce-images/${image}" alt="${image}" class="img-fluid" style="width: 250px;">
                    </div>
                </div>
            </div>
        `);
    });

    // Show the modal
    $('#viewPicturesModal').modal('show');
});




  // $('#search-partenaire').on('keyup', function () {
  //   dt_products.column(9).search(this.value).draw();
  // });
  // Delete Record
  $(document).on('click', '.delete-record', function () {
    var row = $(this).closest('tr');
    var title = $(this).data('title');
    
    // Update the modal message dynamically based on the row's title
    $('#deleteModal .modal-body').text("Êtes-vous sûr de vouloir supprimer ce produit?");
    
    $('#deleteModal').modal('show');

    $('#confirmDeleteProduct').off('click').on('click', function () {
      
      dt_products.row(row).remove().draw();
      $('#deleteModal').modal('hide');
    });
  });

  // Filter form control to default size
  // ? setTimeout used for multilingual table initialization
  setTimeout(() => {
    $('.dataTables_filter .form-control').removeClass('form-control-sm');
    $('.dataTables_length .form-select').removeClass('form-select-sm');
  }, 300);
});
