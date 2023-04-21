require_relative 'application_model'
require_relative 'vote'
require_relative 'legislator'

class Bill < ApplicationModel
  attr_reader :id, :title, :sponsor_id

  def self.filename
    'bills'
  end

  def self.all
    read.map { |row| new(row[:id], row[:title], row[:sponsor_id]) }
  end

  def initialize(id, title, sponsor_id)
    super()
    @id = id
    @title = title
    @sponsor_id = sponsor_id
  end

  def vote
    @vote ||= Vote.find_by(column: :bill_id, value: id)
  end

  def supports
    vote.supports
  end

  def oppositions
    vote.oppositions
  end

  def primary_sponsor
    Legislator.find(sponsor_id)&.name || 'Unknown'
  end
end
