class ApplicationController < ActionController::API
  include ActionController::MimeResponds
end

module Api
    class OperatorsPostesController < ApplicationController
         def index
             sleep 1 # Simulate loading time
             @operators_postes = OperatorsPostes.all
         end

         def create
             @operator_poste = OperatorsPostes.new(operator_poste_params)
             respond_to do |format|
                 if @operator_poste.save
                    format.json { render json: @operator_poste }
                 end
             end
         end

         private

         def operator_poste_params
             params.require(:operators_poste).permit(:operator_id, :poste_id, :operators_poste)
         end
    end
end
