class ApplicationController < ActionController::API
  include ActionController::MimeResponds
end

module Api
  class ItemsController < ApplicationController
    def index
       sleep 1 # Simulate loading time
       @items = Item.all
    end

    def create
        @item = Item.new(items_params)

        respond_to do |format|
           if @item.save
              format.json { render json: @item }
           end
        end
    end

    def destroy
           @item = Item.find_by_id(params[:id])
           if @item.present?
              @item.destroy
           end
    end

     def update
            @item = Item.find_by_id(params[:id])
            if @item.present?
                 @item.checked = true

                 @item.save

                respond_to do |format|
                    format.json { render json: @item }
                end
            end
        end

    private

    def items_params
       params.require(:item).permit(:product_id, :product_name, :by, :checked, :item)
    end
  end
end
