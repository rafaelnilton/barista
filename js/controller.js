
(function() {
	'use strict';

	angular.module('baristaControllers', [])



	.controller('BaristaControllers', BaristaControllers);


	/**
	 * @name calculadoraControllers
	 * 
	 */

	/* @ngInject */
	function BaristaControllers($rootScope,$scope) {
        
      
        
       $('.fancybox').fancybox();
    
       $scope.total = 0;
       $scope.pedidos = [];
       $scope.numPedido = 0;
        
       $scope.novoPedido = [];
        
        $scope.numeros = function numeros(event){
           var tecla = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
           if ((tecla >= 48 && tecla <= 57) || (tecla >= 96 && tecla <= 105) || tecla == 8 ||  tecla == 9){
               return  true;
           }else{
               return  false;
           }
        }
        
        
      
       $scope.pedidoRealizado = function pedidoRealizado(produto, valor){
             swal({
                title: "Deseja confirmar o pedido?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Confirmar",
                cancelButtonText: "Cancelar",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function(isConfirm) {
                if (isConfirm) {
                    swal("Pedido realizado com sucesso", "", "success");
                   
                    $scope.novoPedido = {
                        index   : $scope.numPedido,
                        produto : produto,
                        valor   : valor
                    };
                    $scope.pedidos.push($scope.novoPedido);
                    var i;
                    $scope.total = 0;
                    for(i=0; i < $scope.pedidos.length; i++) {
                        $scope.total += parseFloat($scope.pedidos[i].valor);
                    }
                    
                    $scope.numPedido++;
                    $scope.$apply();
                } else {
                    swal("Cancelado!", "Sua solicitação foi cancelada com sucesso!", "error");
                }
            });


        }

        $scope.cancelarPedido = function cancelarPedido(numPedido) {

            swal({
                title: "Deseja cancelar o pedido?",
                text: "",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Confirmar",
                cancelButtonText: "Cancelar",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function(isConfirm) {
                if (isConfirm) {
                    numPedido = parseInt(numPedido);
                    swal("Cancelado com sucesso!", "", "success");
                    $scope.pedidos.splice(numPedido, 1);
                    $scope.total = 0;
                    var y;
                    for(y=0; y < $scope.pedidos.length; y++) {
                        $scope.total += parseFloat($scope.pedidos[y].valor);
                    }
                    console.log("Pedidos", $scope.pedidos);
                    $scope.$apply();
                } else {
                    swal("Cancelado!", "Sua solicitação de cancelar o pedido foi realizada com sucesso!", "error");
                }
            });



        }

        $scope.mensagemEnviada = function mensagemEnviada(){
           swal("Mensagem enviada com sucesso!", "", "success");
        }

        $scope.taxiChamado = false;
        $scope.taxi = function taxi(){
            
            if($scope.taxiChamado) {
                
                 swal({
                    title: "Deseja cancelar o taxi?",
                    text: "",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Sim, cancelar taxi!",
                    cancelButtonText: "Não!",
                    closeOnConfirm: false,
                    closeOnCancel: false,
                    imageUrl: "images/icTaxi.jpg"
                }, function(isConfirm) {
                    if (isConfirm) {
                        swal("Taxi cancelado com sucesso!", "", "success");
                        $("#menuTaxi").attr('src', 'images/menu3.png');
                        $scope.taxiChamado = false;

                    } else {
                        swal("Cancelado!", "Operação cancelada!", "error");
                    }
                });
            
            
            }else {
            
                
                swal({
                    title: "Deseja solicitar um taxi?",
                    text: "O taxi chega em poucos minutos e te leva com todo conforto!",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Sim, desejo chamar!",
                    cancelButtonText: "Não, desejo cancelar!",
                    closeOnConfirm: false,
                    closeOnCancel: false,
                    imageUrl: "images/icTaxi.jpg"
                }, function(isConfirm) {
                    if (isConfirm) {
                        swal("Taxi solicitado com sucesso!", "Aguarde alguns minutos, o taxi chegará em poucos minutos Número: 1..", "success");
                         $("#menuTaxi").attr('src', 'images/cancelarTaxi.png');
                        $scope.taxiChamado = true;

                    } else {
                        swal("Cancelado!", "Sua solicitação foi cancelada com sucesso!", "error");
                    }
                });
            
            
            }
        
        
        }       


        $scope.pagar = function pagar() {
            swal({
                title: "Deseja fechar a conta?",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Sim, desejo fechar!",
                cancelButtonText: "Não, desejo cancelar!",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function(isConfirm) {
                if (isConfirm) {
                    swal({   title: "Conta fechada!",   text: "Preencha os campos com os dados do cartão",   timer: 3000,   showConfirmButton: false });
                    $('#chamarPagamento').trigger('click');
                    $("#btPagar").addClass('btDesativado');
                    $("#btPagar").attr('onclick', '');
                    $scope.$apply();
                } else {
                    swal("Cancelado!", "Operação cancelada!", "error");
                }
            });
        }
        
        $scope.pagamentoFinal = function pagamentoFinal() {
           swal("Transação realizada com sucesso!", "", "success");

        }
        
        $scope.teclado = function teclado() {
        
            google.load("elements", "1", {
              packages: "keyboard"
            });
            function onLoad() {
            var kbd = new google.elements.keyboard.Keyboard(
              [google.elements.keyboard.LayoutCode.BRAZILIAN_PORTUGUESE],
              ['numeroCartao']);
            }
            google.setOnLoadCallback(onLoad);
            
        }
        
        
	};
	
})();