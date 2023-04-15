require_relative 'application_model'

class Bill < ApplicationModel
  attr_reader :id, :title, :sponsor_id

  def self.filename
    'bills'
  end

  def self.all
    read.map { |row| new(row[:id], row[:title], row[:sponsor_id]) }
  end

  def initialize(id, title, sponsor_id)
    @id = id
    @title = title
    @sponsor_id = sponsor_id
  end
end