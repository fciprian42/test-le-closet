module Api
  class ProductsController < ApplicationController
    def index
       sleep 1 # Simulate loading time
       @products = Product.all
    end

    def destroy
       @product = Product.find(params[:id])
       if @product.present?
          @product.destroy
       end
    end

  end
end
