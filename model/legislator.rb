require_relative 'application_model'
require_relative 'vote_result'

class Legislator < ApplicationModel
  attr_reader :id, :name

  def self.filename
    'legislators'
  end

  def self.all
    read.map { |row| new(row[:id], row[:name]) }
  end

  def initialize(id, name)
    super()
    @id = id
    @name = name
  end

  def results
    @results ||= VoteResult.all.select { |result| result.legislator_id == id }
  end

  def supports
    results.select(&:support?)
  end

  def oppositions
    results.select(&:opposed?)
  end
end
