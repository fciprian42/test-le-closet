module Api
  class ProductsController < ApplicationController
    def index
      sleep 1 # Simulate loading time
      @products = Product.all
    end
  end
end
