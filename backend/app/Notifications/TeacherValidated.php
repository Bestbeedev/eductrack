<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TeacherValidated extends Notification implements ShouldQueue
{
    use Queueable;

    protected $matricule;

    /**
     * Create a new notification instance.
     *
     * @param string $matricule
     */
    public function __construct($matricule)
    {
        $this->matricule = $matricule;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Votre compte enseignant a été validé')
            ->greeting('Félicitations ' . $notifiable->name . ',')
            ->line('Votre compte enseignant a été validé par l\'administrateur.')
            ->line('Voici votre numéro matricule : **' . $this->matricule . '**')
            ->line('Vous devez utiliser ce numéro matricule pour vous connecter à la plateforme.')
            ->action('Se connecter', url('/login'))
            ->line('Conservez précieusement ce numéro car il vous sera demandé à chaque connexion.')
            ->line('Si vous avez des questions, n\'hésitez pas à nous contacter.')
            ->salutation('Cordialement, L\'équipe administrative');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            'matricule' => $this->matricule
        ];
    }
}
