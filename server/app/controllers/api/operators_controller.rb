class ApplicationController < ActionController::API
  include ActionController::MimeResponds
end

module Api
  class OperatorsController < ApplicationController
    def index
      sleep 1 # Simulate loading time
      @operators = Operator.all
    end

    def update
        @operator = Operator.find_by_id(params[:id])
        if @operator.present?
           @operator.score += 5

           @operator.save

            respond_to do |format|
                format.json { render json: @operator }
            end
        end
    end

    private
  end
end
