<?php

namespace App\Events;

use App\Race;
use App\Events\Event;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class RaceUpdated extends Event implements ShouldBroadcast
{
    use SerializesModels;

    public $race;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Race $race)
    {
        $this->race = $race;
    }

    /**
     * Get the channels the event should be broadcast on.
     *
     * @return array
     */
    public function broadcastOn()
    {
        return ['races-channel'];
    }
}
